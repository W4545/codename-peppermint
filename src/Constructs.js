class NavObj {
    constructor(title, icon, link, bottom = false, isDisabled = false) {
        this.title = title;
        this.icon = icon;
        this.to = link;
        this.bottom = bottom;
        this.isDisabled = isDisabled;
    }
}

class CardObj {
    constructor(id, text, isWhiteCard, isSelectable, isSelected = false) {
        this.id = id;
        this.text = text;
        this.isWhiteCard = isWhiteCard;
        this.isSelectable = isSelectable;
        this.isSelected = isSelected;
    }
}

export {
    NavObj, CardObj
};