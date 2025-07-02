# template.rb
git :init

after_bundle do
  # Install Shakapacker (modern replacement for Webpacker)
  system "bundle add shakapacker --strict"
  system "bundle exec rails shakapacker:install"

  git add: "."
  git commit: %Q{ -m 'Shakapacker installed' }

  # Install React on Rails
  system "bundle add react_on_rails --version=14.0.4 --strict"
  system "bundle exec rails generate react_on_rails:install > output.txt" 
  if File.read("output.txt").include?("ERROR: You have uncommitted code. Please commit or stash your changes before continuing")
    git add: "."
    git commit: %Q{ -m 'React on Rails installed with generator' }
    system "bundle exec rails generate react_on_rails:install"
    
  end


  git add: "."
  git commit: %Q{ -m 'React on Rails installed with generator' }

  # Install Tailwind via gem + initializer
  system "bundle add tailwindcss-ruby"
  system "bundle add tailwindcss-rails"
  system "rails tailwindcss:install"

  git add: "."
  git commit: %Q{ -m 'Tailwind installed' }

  create_file "app/javascript/packs/application.css" do
    <<~CSS

    CSS
  end

  # Create a sample React component
  create_file "app/javascript/components/HelloWorld.jsx" do
    <<~JSX
      import React from 'react'

      const HelloWorld = () => {
        return (
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold">Hello from React + Tailwind!</h1>
            <p className="mt-2">This component is styled with Tailwind CSS</p>
          </div>
        )
      }

      export default HelloWorld
    JSX
  end

  # Create a sample page to test everything
  generate :controller, "Home", "index"
  route "root to: 'home#index'"

  # Update the home controller view
  create_file "app/views/home/index.html.erb" do
    <<~ERB
      <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Rails + React + Tailwind!
            </h1>
            
            <div class="bg-white shadow-xl rounded-lg p-8 mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Rails with Shakapacker
              </h2>
              <p class="text-gray-600 mb-4">
                This page demonstrates the integration of Rails, Shakapacker, React, and Tailwind CSS.
              </p>
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✅ All systems are working!
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Rails 8</h3>
                <p class="text-gray-600">Modern Rails with all the latest features</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Shakapacker</h3>
                <p class="text-gray-600">Modern asset pipeline with Webpack</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
                <p class="text-gray-600">Utility-first CSS framework</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ERB
  end

  git add: "."
  git commit: %Q{ -m 'Initial setup with Shakapacker and Tailwind' }


  # Install npm dependencies
  system "npm install"

  # Setup database
  system "rails db:create"
  system "rails db:migrate"

  git add: "."
  git commit: %Q{ -m '🎉 Rails + React on Rails + Tailwind CSS template complete' }

  puts "\n🎉 Template setup complete!"
  puts "\nNext steps:"
  puts "1. Run 'npm run build:development' to compile assets"
  puts "2. Run 'bin/dev' to start the development server"
  puts "3. Visit http://localhost:3000 to see your app"
  puts "\nHappy coding! 🚀"
end