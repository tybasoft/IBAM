const sidebarImageUrl = (state = '', action) => {
  switch (action.type) {
    case 'BG_IMAGE_URL':
      console.log(action, state);
      return action.imgurl;
    default:
      return state;
  }
};

export default sidebarImageUrl;
