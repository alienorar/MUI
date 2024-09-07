import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Groups3Icon from '@mui/icons-material/Groups3';
import AssignmentIcon from '@mui/icons-material/Assignment';
const admin = [
    {
        content: "Teachers",
        path: "/admin-layout",
        icon:<CastForEducationIcon/>
        
    },
    {
        content: "Students",
        path: "/admin-layout/students-list",
        icon: <Groups3Icon/>
    },
];

const student = [
    {
        content: "Groups",
        path: "/student-layout",
        icon: <Groups3Icon />
    },
    {
        content: "Rating",
        path: "/student-layout/rating",
        icon: <TrendingUpIcon />,
    },
    {
        content: "Tasks",
        path: "/student-layout/tasks",
        icon:<AssignmentIcon/>
    },
];

export { admin, student };

