export interface UserProfile {
    __v: number;
​​    _id: string;
​​    active: boolean;
​​    createdAt: string;
​​    email: string;
​​    emailHash: string;
​​    firstName: string;
​​    isVerified: boolean;
​​    lastName: string;
​​    merchantEnrollment: string;
​​    password: string;
​​    role: string;
​​    userId: string;
    phoneNumber?: string;
}
