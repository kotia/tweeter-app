
export interface ITweetResponse {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    tweetId?: string;
}

export interface INewTweetRequest {
    userId: string;
    text: string;
    parentId?: string;
}

export interface IEditTweetRequest {
    id: string;
    text: string;
}

export interface ITweet {
    id: string;
    userId: string;
    text: string;
    parentTweetId?: string;
    timestamp: number;
}

export enum TweetError {
    Fetch = 'fetch',
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete'
}

export enum UserError {
    Fetch = 'fetch',
    Register = 'register',
    Login = 'login',
}

export interface IUserResponse {
    id: string,
    username: string,
}

export interface IUser {
    id: string,
    name: string,
}

export interface ITweetsState {
    tweets: ITweet[];
    error: boolean;
    errorText: string;
    errorType: TweetError;
    errorId: string;
    loading: boolean;
    addTweet: (tweet: ITweet) => void;
    fetchTweets: (tweets: ITweet[]) => void;
    removeTweet: (id: string) => void;
    editTweet: (id: string, text: string) => void;
    setError: (type: TweetError, id: string, text: string) => void;
    setLoading: (isLoading: boolean) => void;
}

export interface IUsersState {
    users: IUser[];
    error: boolean;
    errorText: string;
    errorType: UserError;
    loading: boolean;
    logout: () => void;
    login: (id:string) => void;
    setError: (type: UserError, text: string) => void;
    fetchUsers: (users: IUser[]) => void;
    setLoading: (isLoading: boolean) => void;
}

export interface IUserCredentials {
    username: string;
    password: string;
}