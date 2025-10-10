import React from 'react';

export default function PlayPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Spielen Page</h1>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#F6F7F9',
  },
  title: {
    fontSize: '2rem',
    color: '#169C8F',
  },
};
