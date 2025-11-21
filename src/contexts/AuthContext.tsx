'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserInfo } from '@/types/auth';

interface AuthContextType {
    userInfo: UserInfo | null;
    isAdmin: boolean;
    hasAccess: (organizationId?: number, applicationId?: number) => boolean;
    canRead: (organizationId?: number, applicationId?: number) => boolean;
    canCreate: (organizationId?: number, applicationId?: number) => boolean;
    canUpdate: (organizationId?: number, applicationId?: number) => boolean;
    canDelete: (organizationId?: number, applicationId?: number) => boolean;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        // Cargar userInfo desde localStorage al montar
        try {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        } catch (error) {
            console.error('Error loading user info:', error);
        }
    }, []);

    const isAdmin = userInfo?.admin || false;

    // Verificar si tiene acceso a una organización/aplicación específica
    const hasAccess = (organizationId?: number, applicationId?: number): boolean => {
        if (isAdmin) return true;
        if (!userInfo?.permissions) return false;

        // Si no se especifica org/app, verificar si tiene algún permiso
        if (!organizationId && !applicationId) {
            return userInfo.permissions.length > 0;
        }

        return userInfo.permissions.some(p => {
            const orgMatch = !organizationId || p.organizationId === organizationId;
            const appMatch = !applicationId || p.applicationId === applicationId;
            return orgMatch && appMatch;
        });
    };

    // Verificar permiso de lectura
    const canRead = (organizationId?: number, applicationId?: number): boolean => {
        if (isAdmin) return true;
        if (!userInfo?.permissions) return false;

        return userInfo.permissions.some(p => {
            const orgMatch = !organizationId || p.organizationId === organizationId;
            const appMatch = !applicationId || p.applicationId === applicationId;
            return orgMatch && appMatch && p.canRead;
        });
    };

    // Verificar permiso de creación
    const canCreate = (organizationId?: number, applicationId?: number): boolean => {
        if (isAdmin) return true;
        if (!userInfo?.permissions) return false;

        return userInfo.permissions.some(p => {
            const orgMatch = !organizationId || p.organizationId === organizationId;
            const appMatch = !applicationId || p.applicationId === applicationId;
            return orgMatch && appMatch && p.canCreate;
        });
    };

    // Verificar permiso de actualización
    const canUpdate = (organizationId?: number, applicationId?: number): boolean => {
        if (isAdmin) return true;
        if (!userInfo?.permissions) return false;

        return userInfo.permissions.some(p => {
            const orgMatch = !organizationId || p.organizationId === organizationId;
            const appMatch = !applicationId || p.applicationId === applicationId;
            return orgMatch && appMatch && p.canUpdate;
        });
    };

    // Verificar permiso de eliminación
    const canDelete = (organizationId?: number, applicationId?: number): boolean => {
        if (isAdmin) return true;
        if (!userInfo?.permissions) return false;

        return userInfo.permissions.some(p => {
            const orgMatch = !organizationId || p.organizationId === organizationId;
            const appMatch = !applicationId || p.applicationId === applicationId;
            return orgMatch && appMatch && p.canDelete;
        });
    };

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                isAdmin,
                hasAccess,
                canRead,
                canCreate,
                canUpdate,
                canDelete,
                setUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
