# Sistema de Autenticación y Permisos

## Resumen

Se ha implementado un sistema completo de autenticación y permisos que distingue entre usuarios **admin** y usuarios regulares con permisos específicos.

## Estructura de Respuesta del Login

El endpoint de login ahora devuelve:

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userInfo": {
    "id": 2,
    "username": "configapps",
    "roles": ["Basic"],
    "permissions": [
      {
        "organizationId": 1,
        "organizationName": "orgapp",
        "applicationId": 1,
        "applicationName": "transfer",
        "canRead": true,
        "canCreate": false,
        "canUpdate": false,
        "canDelete": false
      }
    ],
    "admin": false
  }
}
```

## Componentes Principales

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

Proporciona funciones para verificar permisos:

- `isAdmin`: Booleano que indica si el usuario es administrador
- `hasAccess(orgId?, appId?)`: Verifica si tiene acceso a una org/app
- `canRead(orgId?, appId?)`: Verifica permiso de lectura
- `canCreate(orgId?, appId?)`: Verifica permiso de creación
- `canUpdate(orgId?, appId?)`: Verifica permiso de actualización
- `canDelete(orgId?, appId?)`: Verifica permiso de eliminación

### 2. Navegación Condicional

Los items de navegación ahora soportan la propiedad `adminOnly`:

```tsx
{
  label: 'Settings',
  icon: <CogIcon />,
  adminOnly: true,  // Solo visible para admins
  subItems: [...]
}
```

El componente `Shell` filtra automáticamente los items de navegación según los permisos del usuario.

## Comportamiento

### Usuarios Admin (`admin: true`)
- Tienen acceso completo a todas las funcionalidades
- Ven todos los menús, incluyendo Settings (Users, Roles, Permissions)
- Todas las funciones de permisos (`canRead`, `canCreate`, etc.) retornan `true`

### Usuarios No-Admin (`admin: false`)
- Solo ven los menús que no requieren `adminOnly`
- Los permisos se verifican contra el array `permissions`
- Pueden tener diferentes niveles de acceso (read, create, update, delete) por organización/aplicación

## Uso en Componentes

### Ejemplo básico:

```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { isAdmin, canCreate, canDelete } = useAuth();

  return (
    <>
      {isAdmin && <AdminPanel />}
      
      {canCreate() && (
        <button onClick={handleCreate}>Create</button>
      )}
      
      {canDelete(orgId, appId) && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </>
  );
};
```

### En tablas con acciones condicionales:

```tsx
const actions = [
  {
    label: 'Edit',
    onClick: handleEdit,
    shouldShow: (item) => canUpdate(item.organizationId, item.applicationId)
  },
  {
    label: 'Delete',
    onClick: handleDelete,
    shouldShow: (item) => canDelete(item.organizationId, item.applicationId)
  }
];
```

## Archivos Modificados

1. **Tipos**:
   - `src/types/auth.ts`: Agregado `UserPermission`, actualizado `UserInfo`
   - `src/types/navigation.ts`: Agregado campo `adminOnly`
   - `src/types/models.ts`: Agregado campo `editable` a `Role`

2. **Contextos**:
   - `src/contexts/AuthContext.tsx`: Nuevo contexto de autenticación
   - `src/app/(dashboard)/layout.tsx`: Envuelto con `AuthProvider`

3. **Componentes**:
   - `src/components/Shell.tsx`: Filtrado de navegación según permisos
   - `src/components/navigation.tsx`: Marcado items admin-only
   - `src/components/Table.tsx`: Soporte para acciones condicionales con `shouldShow`
   - `src/components/Input.tsx`: Agregado soporte para `rightElement`
   - `src/components/SecretInput.tsx`: Refactorizado para usar `rightElement`

4. **Páginas**:
   - `src/app/(auth)/login/page.tsx`: Guarda información completa de usuario
   - `src/app/(dashboard)/organizations/page.tsx`: **Implementación completa de permisos**
   - `src/app/(dashboard)/applications/page.tsx`: **Implementación completa de permisos**
   - `src/app/(dashboard)/admin/roles/page.tsx`: Campo `editable` por defecto en `true`
   - `src/app/(dashboard)/admin/roles/RoleTable.tsx`: Uso de `shouldShow` con campo `editable`

## Implementación Completa en Organizations y Applications

### Organizations Page

```tsx
const { canUpdate, canDelete, canCreate } = useAuth();

// Botón "Add Organization" solo visible si tiene permiso de crear
const actionButton = useMemo(() => {
  if (!canCreate()) return null;
  return <button onClick={...}>Add Organization</button>;
}, [canCreate]);

// Acciones con verificación de permisos por organización
const actions = [
  {
    label: 'Edit',
    onClick: openEditForm,
    shouldShow: (org: Organization) => {
      const orgId = typeof org.id === 'string' ? parseInt(org.id) : org.id;
      return canUpdate(orgId);
    },
  },
  {
    label: 'Delete',
    onClick: handleDelete,
    shouldShow: (org: Organization) => {
      const orgId = typeof org.id === 'string' ? parseInt(org.id) : org.id;
      return canDelete(orgId);
    },
  },
];
```

### Applications Page

```tsx
const { canUpdate, canDelete, canCreate } = useAuth();

// Botón "Add Application" solo visible si tiene permiso de crear
const actionButton = useMemo(() => {
  if (!canCreate()) return null;
  return <button onClick={...}>Add Application</button>;
}, [canCreate]);

// Acciones con verificación de permisos por organización Y aplicación
const actions = [
  {
    label: 'Edit',
    onClick: openEditForm,
    shouldShow: (app: Application) => {
      const orgId = typeof app.organizationId === 'string' ? parseInt(app.organizationId) : app.organizationId;
      const appId = typeof app.id === 'string' ? parseInt(app.id) : app.id;
      return canUpdate(orgId, appId);
    },
  },
  {
    label: 'Delete',
    onClick: handleDelete,
    shouldShow: (app: Application) => {
      const orgId = typeof app.organizationId === 'string' ? parseInt(app.organizationId) : app.organizationId;
      const appId = typeof app.id === 'string' ? parseInt(app.id) : app.id;
      return canDelete(orgId, appId);
    },
  },
];
```

## Próximos Pasos Recomendados

1. ✅ **COMPLETADO**: Implementar control de permisos en Organizations y Applications
2. Implementar guards de ruta para proteger páginas admin
3. Mostrar mensajes de "Sin permisos" cuando un usuario no-admin intente acceder a funciones restringidas
4. Implementar refresh del token y manejo de sesión expirada
5. Agregar indicadores visuales cuando un usuario tiene permisos limitados
