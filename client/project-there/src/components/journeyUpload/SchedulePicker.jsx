import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SchedulePicker() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div>여행 스케줄</div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
