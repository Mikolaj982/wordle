const PlayAgain = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <button onClick={handleRefresh}>
            Zagraj ponownie
        </button>
    );
};

export default PlayAgain;
