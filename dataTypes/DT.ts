export interface ChairsData {
    firstName: string,
    lastName: string,
    picture: string,
    text: string,
    committee: string,
}
export interface ConferenceMetaData {
    id: string,
    theme: string,
    startDate: Date,
    endDate: Date,
    membership: string,
    year: string,
}
export interface ExtendedProps {
    description: string,
    location: string,
    locationLink: string,
    typeOfEvent: string,
}
export interface ConferenceEvents {
    title: string,
    start: string,
    end: string,
    color: string,
    allDay: boolean,
    extendedProps: ExtendedProps
}
export interface Committee {
    mainName: string
    fullName: string
    logo: string
    topic: string
    description?: string
    SignUpLink: string
    metaImage: string
    type: string
}

export interface news {
    id: string,
    title: string,
    content: string,
    date: string,
    author: string,
    type: string,
    postUrl: string,
}
export interface newsArticle {
    id: string,
    title: string,
    content: string,
    date: string,
    author: string,
    postUrl: string,
    type: string,
}
export interface TeamMember {
    name: string,
    role: string,
    bio: string
    picture: string,
    team: string,
    website: string,
    linkedin: string,
}

export interface TeamMemberRole {
    name: string,
    fullName: string,
    role: string,
    picture?: string,
    info?: Array<
        | { type: 'studywhere', value: string }
        | { type: 'studywhat', value: string }
        | { type: 'link', value: { platform: string, link: string } }
    >
}

export interface Collab{
    name: string,
    fullName:string,
    website:string,
    picture:string,
    affiliation:string,
    type:string,
}