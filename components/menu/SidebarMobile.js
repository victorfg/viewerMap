import  MenuComponent  from "../../components/map/Menu/MenuComponent";
export function SidebarMobile (props) {
    const {showSidebar, setShowSidebar} = props;
    return (
        <>
        {showSidebar ? (
            <button
                className="flex text-4xl items-center cursor-pointer fixed top-4 z-50"
                onClick={() => setShowSidebar(!showSidebar)}
            >
            x
            </button>
        ) : (
            <svg 
                onClick={() => setShowSidebar(!showSidebar)}
                width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#000" stroke-width="2" d="M2,19 L22,19 M2,5 L22,5 M2,12 L22,12"/>
            </svg>
        )}

        <div
            id='sidebarMobile'
            className={`w-9/12 top-0 left-0 bg-white fixed h-full z-40  ease-in-out duration-300 ${ showSidebar ? "translate-x-0 " : "transform-100"}`}
        >
            <div className="flex ml-2 mt-20 items-center">
                <div className="pl-4">
                    <MenuComponent 
                        {...props}
                    />
                </div>
            </div>
        </div>
        </>
    );
  };