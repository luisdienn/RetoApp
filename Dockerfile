# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.4.4
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

# + libpq5 para pg en runtime
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips sqlite3 libpq5 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# ==== build stage ====
FROM base AS build

# + toolchain, headers de libpq y Node/NPM sólo para compilar y resolver plugins de Tailwind
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libyaml-dev pkg-config libpq-dev nodejs npm && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Código (incluye package.json si existe)
COPY . .

# Si hay package.json, usamos npm ci; si no, creamos uno mínimo.
# En ambos casos aseguramos la instalación del plugin 'tw-animate-css'
RUN if [ -f package.json ]; then \
      npm ci --no-audit --no-fund || npm install --no-audit --no-fund; \
    else \
      npm init -y >/dev/null 2>&1; \
    fi && \
    npm ls tw-animate-css >/dev/null 2>&1 || npm install --no-audit --no-fund tw-animate-css@latest

# Precompile bootsnap y assets
RUN bundle exec bootsnap precompile app/ lib/
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# Limpieza: no necesitamos node_modules en la imagen final
RUN rm -rf node_modules ~/.npm

# ==== final stage ====
FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
