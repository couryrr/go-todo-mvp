const Navigation = (props) => {

    const toggleCreateModalOpen = (e) => {
        props.toggleCreateModalOpen()
    }

    return (
        <nav className="site-nav">
            <button onClick={toggleCreateModalOpen}>Create</button>
        </nav>
    )
}

export default Navigation