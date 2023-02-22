import { nanoid } from "nanoid";


export const NavInfo = [
    {
        id: nanoid(),
        img: "Home.png",
        name: 'Home',
        active: "HomeActive.png",
        link: "/",
        isActive: true
    },
    {
        id: nanoid(),
        img: "playlist.png",
        name: 'My Collections',
        active: "playlistActive.png",
        link: "/collection",
        isActive: false
    },
    {
        id: nanoid(),
        img: "radio.png",
        name: 'Radio',
        active: "radioActive.png",
        link: "/",
        isActive: false
    },
    {
        id: nanoid(),
        img: "videos.png",
        name: 'Music Videos',
        active: "videosActive.png",
        link: "/",
        isActive: false
    },
    {
        id: nanoid(),
        img: "profile.png",
        name: 'Profile',
        active: "profileActive.png",
        link: "/",
        isActive: false
    },
    {
        id: nanoid(),
        img: "logout.png",
        name: 'Log Out',
        active: "LogoutActive.png",
        link: "/",
        isActive: false
    },
]