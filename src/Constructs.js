class NavObj {
    constructor(title, icon, link, bottom = false) {
        this.title = title;
        this.icon = icon;
        this.to = link;
        this.bottom = bottom;
    }
}

export {
    NavObj
};