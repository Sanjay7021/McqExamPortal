import { Role } from "./enum";


const messages = {
    USER_DELETE: "are you sure you want to delete the user?",
    UPDATED_SUCCESS: "Record updated successfully",
    UPDATED_FAIL: "Record cannot be updated",
    DELETE_SUCCESS: "Record deleted successfully",
    DELETE_FAIL: "Record cannot be deleted",
    ORDER_SUCCESS: "Your order is successfully placed",
}

const LocalStorageKeys = {
    USER: "user",
};

const NavigationItems = [
    {
        name: "Dashboard",
        route: '/StudentDashboard',
        access: [Role.Student],
    }, {
        name: "Dashboard",
        route: '/FacultyDashboard',
        access: [Role.Faculty],
    },
     {
        name: "Results",
        route: '/results',
        access: [Role.Student],
    },
    {
        name: 'Student',
        route: "/student",
        access: [Role.Admin, Role.Faculty],
    },
    {
        name: "Subject",
        route: "/subject",
        access: [Role.Admin, Role.Faculty],
    },
    {
        name: 'Create Exam',
        route: "/createExam",
        access: [Role.Admin, Role.Faculty],
    },
    {
        name:'Add Questions',
        route:"/Add-Questions",
        access:[Role.Faculty]
    },
    {
        name: "Update Profile",
        route: '/update-profile',
        access: [Role.Admin, Role.Faculty, Role.Student],
    }
]

const hasAccess = (pathname: string, user: any) => {
    const navItem = NavigationItems.find((navItem) =>
        pathname.includes(navItem.route)
    );
    if (navItem) {
        return (
            !navItem.access ||
            !!(navItem.access && navItem.access.includes(user.roleId))
        )
    }
    return true;
}

export default {
    hasAccess,
    NavigationItems,
    LocalStorageKeys,
    messages,
}
