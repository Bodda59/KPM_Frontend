const STORAGE_KEY = "lessons_data";

const defaultLessons = [
    {
        id: 1,
        title: "Software Integration",
        poster: "Naggar",
        industry: "Advansys",
        department: "Software",
        keyword: "Backend",
        description: "Connecting backend to frontend",
        image: "https://picsum.photos/seed/math1/300/160",
        pdf: "",
        rating: 4.5,
        ratingCount: 32,
    },
    {
        id: 2,
        title: "Current Adjustment",
        poster: "Ahmed",
        industry: "Advansys",
        department: "Electrical",
        keyword: "Current",
        description: "Adjusting the current",
        image: "https://picsum.photos/seed/math2/300/160",
        pdf: "",
        rating: 4.0,
        ratingCount: 18,
    },
    {
        id: 3,
        title: "Robot Hand",
        poster: "Youssef",
        industry: "Advansys",
        department: "Robotics",
        keyword: "Robot",
        description: "Connected the robot arm",
        image: "https://picsum.photos/seed/sci1/300/160",
        pdf: "",
        rating: 5.0,
        ratingCount: 40,
    }
];

function loadLessons() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (err) {
        console.error("Failed to load lessons from storage:", err);
    }
    return defaultLessons;
}

function saveLessons(lessons) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
    } catch (err) {
        console.error("Failed to save lessons to storage:", err);
    }
}

const lessons = loadLessons();

export function addLesson(lesson) {
    const newLesson = {
        id: lessons.length ? Math.max(...lessons.map((l) => l.id)) + 1 : 1,
        rating: 0,
        ratingCount: 0,
        image: "https://picsum.photos/seed/new" + Date.now() + "/300/160",
        ...lesson,
    };
    lessons.push(newLesson);
    saveLessons(lessons);
    return newLesson;
}

export default lessons;