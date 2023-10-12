import React from 'react';

export const ErrorHandler: React.FC<{ msg: string }> = ({ msg }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor: '#ffcccc',
                    border: '1px solid #ff6666',
                    padding: '10px',
                    color: '#ff0000',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}>
                {msg}
            </div>
        </>
    )
}