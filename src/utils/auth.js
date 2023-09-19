import moment from "moment/moment";

const users = [
    {
        username: "Mehmet Ubeyde Kara",
        email: "ubeyde",
        password: "815366"
    },
    {
        username: "Ahmet Güven",
        email: "ahmet",
        password: "30151530"
    }
];

const checkUser = (email, password) => {
    let user = false;

    users.forEach((usr) => {
        if (email === usr.email && password === usr.password) {
            user = usr;
            return usr;
        }
    });

    return user;
}

export const login = (email, password) => {
    let user = checkUser(email, password);

    if (user)
        user = {...user, expiresIn: moment().add(3, "hours")};

    return user;
};

export const userExpired = (user) => (
    moment().isAfter(user?.expiresIn)
)
