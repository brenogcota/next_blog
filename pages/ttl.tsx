import React, { useState } from 'react';

const containerStyle: React.CSSProperties = {
  maxWidth: 440,
  margin: '40px auto',
  padding: 24,
  borderRadius: 16,
  background: 'white',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 8,
  fontWeight: 500,
  color: '#333',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #ddd',
  fontSize: 16,
  marginBottom: 0,
  width: '100%',
  boxSizing: 'border-box',
};

const radioStyle: React.CSSProperties = {
  marginRight: 8,
};

const resultStyle: React.CSSProperties = {
  marginTop: 24,
  fontSize: 20,
  fontWeight: 600,
  color: '#0070f3',
};

export default function TTLPage() {
  const [singleMode, setSingleMode] = useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  let seconds = '';
  if (!singleMode && date1 && date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    seconds = Math.abs(Math.floor((d2.getTime() - d1.getTime()) / 1000)).toString();
  } else if (singleMode && date1) {
    const now = new Date();
    const d1 = new Date(date1);
    seconds = Math.abs(Math.floor((now.getTime() - d1.getTime()) / 1000)).toString();
  }

  return (
    <div style={containerStyle}>
      <h2 style={{textAlign: 'center', marginBottom: 24}}>TTL</h2>
      {!singleMode ? (
        <div style={{display: 'flex', gap: 16, marginBottom: 16}}>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <label style={labelStyle}>From</label>
            <input
              type="datetime-local"
              style={inputStyle}
              value={date1}
              onChange={e => setDate1(e.target.value)}
            />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <label style={labelStyle}>To</label>
            <input
              type="datetime-local"
              style={inputStyle}
              value={date2}
              onChange={e => setDate2(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div style={{marginBottom: 16}}>
          <label style={labelStyle}>To</label>
          <input
            type="datetime-local"
            style={inputStyle}
            value={date1}
            onChange={e => setDate1(e.target.value)}
          />
        </div>
      )}
      <div style={{marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          id="singleMode"
          checked={singleMode}
          onChange={e => setSingleMode(e.target.checked)}
          style={{marginRight: 8}}
        />
        <label htmlFor="singleMode" style={{ ...labelStyle, marginBottom: 0}}>now</label>
      </div>
      {seconds && (
        <div style={resultStyle}>
          {!singleMode ? 'Seconds between dates:' : 'Seconds from now:'} <br />
          {seconds}
        </div>
      )}
    </div>
  );
}
