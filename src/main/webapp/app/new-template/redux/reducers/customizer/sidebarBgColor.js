const sidebarBgColor = (state = "", action) => {  
    switch (action.type) {
        case 'BG_COLOR':
            return action.color
        case 'LAYOUT_COLOR':
            return action.layoutColor;
        default:
            return state
    }
}

export default sidebarBgColor