export class RepoEntity {

    name;
    url;
    avatar;
    owner;
    desc;
    id;

    constructor(
        name,
        url,
        avatar,
        owner,
        desc,
        id) {
        this.name = name;
        this.url = url;
        this.avatar = avatar;
        this.owner = owner;
        this.desc = desc;
        this.id = id;
    }

}
