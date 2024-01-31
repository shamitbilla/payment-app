import { atom } from 'recoil';

export const firsNameAtom = atom({
    key : "firstNameAtom",
    default : "User"
});

export const lastNameAtom = atom({
    key : "lastNameAtom",
    default : "ok"
});
export const usernameAtom = atom({
    key : "usernameAtom",
    default : "ok"
});
export const passwordAtom = atom({
    key : "passwordAtom",
    default : "ok"
});

export const balanceAtom = atom({
    key : "balance",
    default : "00"
});

export const usersAtom = atom({
    key : "userAtom",
    default : []
});

export const filterAtom = atom({
    key : "filter",
    default : "s"
});

export const myFirstNameAtom = atom({
    key : "myFirstNameAtom",
    default : ""
});

export const myLastNameAtom = atom({
    key : "myLastNameAtom",
    default : ""
});

export const amountAtom = atom({
    key : "amountAtom",
    default : 0
});

export const toNameAtom = atom({
    key : "toNameAtom",
    default : ""
})

export const toAtom = atom({
    key : "toAtom",
    default : ""
});

