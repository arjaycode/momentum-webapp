export interface AuthUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string | null;
    role?: string;
}

export interface SharedProps {
    auth: {
        user: AuthUser | null;
    };
    flash: {
        success?: string | null;
    };
    adminNotificationsUrl?: string | null;
    adminNotificationsClearUrl?: string | null;
}

declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
    }
}
