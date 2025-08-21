import React from "react";
import ReactCalendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <ReactCalendar onChange={onChange} value={value} className="bg-red-300" />
    </div>
  );
}
