import uid from 'uid-promise'

export const getUser = () => {
    const storage = JSON.parse(localStorage.getItem('snipcode'))
    if (storage) {
        return storage;

    }

    const cfg = {
        user: {
            uid: "",
            snips: null,
            tags: [],
            createOn: "Today",
            onboard: false,
            pro: false,
            timestamp: Date.now()
        }
    }

    localStorage.setItem('snipcode', JSON.stringify(cfg))

    return cfg
}

export const updateUser = user => {
    user.timestamp = Date.now();
    return localStorage.setItem('snipcode', JSON.stringify({ user }))
}

export const addSnip = ({ title, code, tags, language }) => {
    return new Promise(async (resolve, reject) => {
        if (!title) {
            return reject(new TypeError('title is required'))
        }
        const { user } = getUser()
        const id = await uid(20);
        const snip = {
            id,
            title,
            code,
            tags,
            language,
            timestamp: Date.now()
        }

        const snips = [...user.snips, snip]
        user.snips = snips
        user.timestamp = Date.now();
        resolve(localStorage.setItem('snipcode', JSON.stringify({ user })))
    })
}

export const updatesnip = ({ id, newsnip }) => {
    return new Promise(async (resolve, reject) => {
        if (!newsnip && !id) {
            return reject(new TypeError('id and snip is required'))
        }
        const { user } = getUser()
        const snip = user.snips.filter(snipcode => snipcode.id === id)[0]
        snip.title = newsnip.title || snip.title
        snip.code = newsnip.code || snip.code
        snip.tags = newsnip.tags || snip.tags
        snip.language = newsnip.language || snip.language
        snip.timestamp = Date.now()
        const snips = user.snips.filter(t => {
            if (t.id === id) {
                return (t = snip)
            }
            return t
        })
        user.snips = snips;
        user.timestamp = Date.now();
        resolve(localStorage.setItem('snipcode', JSON.stringify({ user })))
    })
}

export const removeSnip = (id) => {
    return new Promise((resolve, reject) => {
        let { user } = getUser();
        const snips = user.snips.filter((s => s.id !== id));
        user.snips = snips;
        user.timestamp = Date.now();
        resolve(localStorage.setItem('snipcode', JSON.stringify({ user })));
    })
}

export const addTag = (tags) => {
    return new Promise((resolve, reject) => {
        let _tags = [];
        const { user } = getUser();
        const __tags = user.tags.concat(tags.filter((item) => item))
        user.tags = __tags;
        __tags.map(t => _tags.push(t.id))
        resolve(_tags);
    })
}

export const updateTag = (id, newTag) => {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject(new TypeError('Enter Source Projects'));
        }
        const { user } = getUser();
        const tag = user.tags.filter((p) => p.id === id);
        tag.id = newTag.id;
        tag.title = newTag.title;
        const tags = user.tags.map((p) => {
            if (p.id === id) {
                return (p = tag)
            }
            return p
        })
        user.tags = tags
        resolve(localStorage.setItem('snipcode', JSON.stringify((user))))
    })
};