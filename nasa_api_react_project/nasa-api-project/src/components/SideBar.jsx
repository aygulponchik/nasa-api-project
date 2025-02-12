export default function SideBar(props) {
    const { handlerToggleModal, data } = props
    return (
        <div className="sidebar">
            <div onClick={handlerToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <div className="descriptionContainer">
                    <h2>{data?.title}</h2>
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handlerToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i> a
                </button>
            </div>

        </div>
    )
}