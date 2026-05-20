(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/Schedule/SchedulePage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchedulePage",
    ()=>SchedulePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/react/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/daygrid/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$timegrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/timegrid/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$interaction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/interaction/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/list/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$teacherSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/teacherSettings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$AppLanguage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/AppLanguage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const COURSE_COLORS = [
    '#4c9f70',
    '#2d7dd2',
    '#ff7f50',
    '#f7b32b',
    '#7a5cff',
    '#9c6644',
    '#2a9d8f',
    '#e76f51'
];
const hashString = (value)=>value.split('').reduce((acc, char)=>acc + char.charCodeAt(0), 0);
const toApiLocalDateTime = (date)=>{
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return `${offsetDate.toISOString().slice(0, 19)}`;
};
const getCurrentUser = ()=>{
    const raw = localStorage.getItem('user');
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
};
const SchedulePage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$AppLanguage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppLanguage"])();
    const isEn = language === 'en';
    const calendarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SchedulePage.useMemo[currentUser]": ()=>getCurrentUser()
    }["SchedulePage.useMemo[currentUser]"], []);
    const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
    const roleName = roleRaw.toLowerCase();
    const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
    const isManager = roleName.includes('менеджер') || roleName.includes('manager');
    const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedTeacherId, setSelectedTeacherId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SchedulePage.useState": ()=>isTeacher && currentUser ? currentUser.id : 'all'
    }["SchedulePage.useState"]);
    const [viewportWidth, setViewportWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(window.innerWidth);
    const [currentViewType, setCurrentViewType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dayGridMonth');
    const [teacherSettings, setTeacherSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SchedulePage.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$teacherSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadTeacherSettings"])(currentUser)
    }["SchedulePage.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            if (isTeacher && currentUser) {
                setSelectedTeacherId(currentUser.id);
            }
        }
    }["SchedulePage.useEffect"], [
        isTeacher,
        currentUser
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            const syncSettings = {
                "SchedulePage.useEffect.syncSettings": ()=>setTeacherSettings((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$teacherSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadTeacherSettings"])(currentUser))
            }["SchedulePage.useEffect.syncSettings"];
            syncSettings();
            window.addEventListener('storage', syncSettings);
            window.addEventListener('teacher-settings-updated', syncSettings);
            return ({
                "SchedulePage.useEffect": ()=>{
                    window.removeEventListener('storage', syncSettings);
                    window.removeEventListener('teacher-settings-updated', syncSettings);
                }
            })["SchedulePage.useEffect"];
        }
    }["SchedulePage.useEffect"], [
        currentUser
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            const handleResize = {
                "SchedulePage.useEffect.handleResize": ()=>setViewportWidth(window.innerWidth)
            }["SchedulePage.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "SchedulePage.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["SchedulePage.useEffect"];
        }
    }["SchedulePage.useEffect"], []);
    const teacherOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SchedulePage.useMemo[teacherOptions]": ()=>users.filter({
                "SchedulePage.useMemo[teacherOptions]": (user)=>user.role.name.toLowerCase() === 'преподаватель'
            }["SchedulePage.useMemo[teacherOptions]"])
    }["SchedulePage.useMemo[teacherOptions]"], [
        users
    ]);
    const getCourseColor = (courseName)=>COURSE_COLORS[hashString(courseName) % COURSE_COLORS.length];
    const load = async ()=>{
        const teacherIdForRequest = selectedTeacherId === 'all' ? undefined : selectedTeacherId;
        const [lessonsRes, groupsRes, coursesRes, usersRes, makeupsRes] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].lessons(teacherIdForRequest),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].list(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].list(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].users(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].makeupCalendar(teacherIdForRequest, true)
        ]);
        const groupsData = groupsRes.data;
        const coursesData = coursesRes.data;
        setCourses(coursesData);
        setUsers(usersRes.data);
        const groupMap = new Map(groupsData.map((group)=>[
                group.id,
                group
            ]));
        const courseMap = new Map(coursesData.map((course)=>[
                course.id,
                course
            ]));
        const renderedLessonEvents = lessonsRes.data.filter((lesson)=>{
            if (isTeacher && !teacherSettings.showCancelledLessons && lesson.is_cancelled) {
                return false;
            }
            return true;
        }).filter((lesson)=>{
            if (selectedTeacherId === 'all') {
                return true;
            }
            const group = groupMap.get(lesson.group_id);
            return group?.teacher_id === selectedTeacherId;
        }).map((lesson)=>{
            const group = groupMap.get(lesson.group_id);
            const course = group ? courseMap.get(group.course_id) : undefined;
            const courseName = course?.name ?? 'Без курса';
            let color = getCourseColor(courseName);
            if (lesson.is_cancelled) {
                color = '#9ca3af';
            } else if (lesson.is_conducted) {
                color = '#16a34a';
            }
            const fullTitle = `${courseName}: ${lesson.topic}`;
            const shortTitle = lesson.topic;
            return {
                id: String(lesson.id),
                title: fullTitle,
                start: lesson.start_at,
                end: lesson.end_at,
                color,
                extendedProps: {
                    eventKind: 'lesson',
                    lessonType: lesson.lesson_type,
                    isCancelled: lesson.is_cancelled,
                    isConducted: lesson.is_conducted,
                    shortTitle,
                    fullTitle,
                    courseName,
                    isRecurringWeekly: lesson.is_recurring_weekly
                }
            };
        });
        const renderedMakeupEvents = makeupsRes.data.map((makeup)=>{
            const startDate = new Date(makeup.makeup_lesson_at);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
            const participantsLabel = makeup.participants_count > 1 ? ` (${makeup.participants_count} учен.)` : '';
            return {
                id: `makeup-${makeup.attendance_id}`,
                title: `${makeup.makeup_completed ? '[Done]' : '[Makeup]'} Отработка${participantsLabel}: ${makeup.client_full_name}`,
                start: makeup.makeup_lesson_at,
                end: endDate.toISOString(),
                color: makeup.makeup_completed ? '#16a34a' : '#dc2626',
                editable: false,
                extendedProps: {
                    eventKind: 'makeup',
                    lessonType: 'makeup',
                    clientId: makeup.client_id,
                    makeupGroupId: makeup.makeup_group_id,
                    makeupTeacherId: makeup.makeup_teacher_id,
                    makeupAt: makeup.makeup_lesson_at,
                    isCancelled: false,
                    isConducted: makeup.makeup_completed
                }
            };
        });
        setEvents([
            ...renderedLessonEvents,
            ...renderedMakeupEvents
        ]);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            load().catch(console.error);
        }
    }["SchedulePage.useEffect"], [
        selectedTeacherId,
        teacherSettings.showCancelledLessons,
        isTeacher
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            let updateTimeout = null;
            const updateCalendarSize = {
                "SchedulePage.useEffect.updateCalendarSize": ()=>{
                    if (updateTimeout) {
                        clearTimeout(updateTimeout);
                    }
                    const api = calendarRef.current?.getApi();
                    if (!api) {
                        return;
                    }
                    requestAnimationFrame({
                        "SchedulePage.useEffect.updateCalendarSize": ()=>api.updateSize()
                    }["SchedulePage.useEffect.updateCalendarSize"]);
                    updateTimeout = setTimeout({
                        "SchedulePage.useEffect.updateCalendarSize": ()=>api.updateSize()
                    }["SchedulePage.useEffect.updateCalendarSize"], 340);
                }
            }["SchedulePage.useEffect.updateCalendarSize"];
            const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver({
                "SchedulePage.useEffect": ()=>updateCalendarSize()
            }["SchedulePage.useEffect"]) : null;
            if (resizeObserver && containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }
            window.addEventListener('resize', updateCalendarSize);
            updateCalendarSize();
            return ({
                "SchedulePage.useEffect": ()=>{
                    window.removeEventListener('resize', updateCalendarSize);
                    resizeObserver?.disconnect();
                    if (updateTimeout) {
                        clearTimeout(updateTimeout);
                    }
                }
            })["SchedulePage.useEffect"];
        }
    }["SchedulePage.useEffect"], []);
    const handleDateClick = (info)=>{
        const params = new URLSearchParams({
            date: info.dateStr
        });
        if (selectedTeacherId !== 'all') {
            params.set('teacherId', String(selectedTeacherId));
        }
        router.push(`/calendar/new?${params.toString()}`);
    };
    const handleEventClick = (info)=>{
        if (String(info.event.id).startsWith('makeup-')) {
            if (isManager || isAdmin) {
                const params = new URLSearchParams();
                const makeupTeacherId = info.event.extendedProps?.makeupTeacherId;
                const makeupAt = info.event.extendedProps?.makeupAt;
                if (makeupTeacherId) {
                    params.set('teacherId', String(makeupTeacherId));
                }
                if (makeupAt) {
                    params.set('date', makeupAt.slice(0, 10));
                    params.set('makeupAt', makeupAt);
                }
                params.set('mode', 'makeup');
                router.push(`/calendar/new?${params.toString()}`);
                return;
            }
            const params = new URLSearchParams();
            const makeupTeacherId = info.event.extendedProps?.makeupTeacherId;
            const makeupGroupId = info.event.extendedProps?.makeupGroupId;
            const makeupAt = info.event.extendedProps?.makeupAt;
            if (makeupTeacherId) {
                params.set('teacherId', String(makeupTeacherId));
            }
            if (makeupGroupId) {
                params.set('makeupGroupId', String(makeupGroupId));
            }
            if (makeupAt) {
                params.set('date', makeupAt.slice(0, 10));
                params.set('makeupAt', makeupAt);
            }
            params.set('mode', 'makeup-attendance');
            router.push(`/calendar/new?${params.toString()}`);
            return;
        }
        router.push(`/calendar/${info.event.id}/edit`);
    };
    const handleEventDrop = async (info)=>{
        if (String(info.event.id).startsWith('makeup-')) {
            info.revert();
            return;
        }
        const lessonId = Number(info.event.id);
        if (!Number.isInteger(lessonId) || lessonId <= 0 || !info.event.start) {
            info.revert();
            return;
        }
        const previousStart = info.oldEvent.start;
        const previousEnd = info.oldEvent.end;
        const previousDuration = previousStart && previousEnd ? previousEnd.getTime() - previousStart.getTime() : 60 * 60 * 1000;
        const nextStart = info.event.start;
        const nextEnd = info.event.end ?? new Date(nextStart.getTime() + previousDuration);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].updateLesson(lessonId, {
                start_at: toApiLocalDateTime(nextStart),
                end_at: toApiLocalDateTime(nextEnd),
                apply_to_future: false
            });
            notify('success', isEn ? 'Lesson moved' : 'Занятие перенесено', isEn ? 'New lesson time has been saved.' : 'Новое время занятия сохранено.');
            await load();
        } catch (error) {
            console.error(error);
            info.revert();
            notify('error', isEn ? 'Error' : 'Ошибка', isEn ? 'Failed to save lesson time.' : 'Не удалось сохранить новое время занятия.');
        }
    };
    const renderEventContent = (info)=>{
        const isTimeGridView = info.view.type.startsWith('timeGrid');
        const isMonthView = info.view.type === 'dayGridMonth';
        const isListView = info.view.type.startsWith('list');
        const timeText = info.timeText || (info.event.start ? info.event.start.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }) : '');
        const lessonType = info.event.extendedProps?.lessonType ?? 'group';
        const typeLabelShort = lessonType === 'individual' ? isEn ? 'Ind.' : 'Инд.' : lessonType === 'makeup' ? isEn ? 'Mkp.' : 'Отр.' : isEn ? 'Grp.' : 'Гр.';
        const typeLabelLong = lessonType === 'individual' ? isEn ? 'Individual' : 'Индивидуальное' : lessonType === 'makeup' ? isEn ? 'Makeup' : 'Отработка' : isEn ? 'Group' : 'Групповое';
        const isCancelled = Boolean(info.event.extendedProps?.isCancelled);
        const isConducted = Boolean(info.event.extendedProps?.isConducted);
        const statusLabel = isCancelled ? isEn ? 'Cancelled' : 'Отменено' : isConducted ? isEn ? 'Conducted' : 'Проведено' : '';
        const shortTitle = info.event.extendedProps?.shortTitle ?? info.event.title;
        const fullTitle = info.event.extendedProps?.fullTitle ?? info.event.title;
        const isRecurringWeekly = Boolean(info.event.extendedProps?.isRecurringWeekly);
        const displayTitle = isTeacher ? teacherSettings.eventTitleMode === 'short' || !teacherSettings.showCourseInTitle ? shortTitle : fullTitle : info.event.title;
        const listTimeLabel = timeText || (isEn ? 'Time not set' : 'Время не указано');
        const indicatorColor = info.event.backgroundColor || info.event.borderColor || '#64748b';
        const titleLinesClass = `calendar-event-title--lines-${isTeacher ? teacherSettings.eventTitleLines : 2}`;
        const isMakeup = lessonType === 'makeup';
        if (isMakeup) {
            if (isListView) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "calendar-list-event calendar-list-event--time-only",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "calendar-list-event-time-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "calendar-list-event-time",
                                children: listTimeLabel
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 346,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "calendar-event-makeup-chip",
                                children: isEn ? 'Makeup' : 'Отработка'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 347,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 345,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                    lineNumber: 344,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "calendar-event-inner calendar-event-inner--time-only",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "calendar-event-time-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "calendar-event-time",
                            children: listTimeLabel
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "calendar-event-makeup-chip",
                            children: isEn ? 'Makeup' : 'Отработка'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 356,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                    lineNumber: 354,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 353,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (isListView) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `calendar-list-event ${isTeacher && teacherSettings.dimConductedEvents && isConducted ? 'calendar-list-event--muted' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "calendar-list-event-top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "calendar-list-event-head-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "calendar-list-event-indicator",
                                        style: {
                                            backgroundColor: indicatorColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !isTeacher || teacherSettings.showEventTime ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "calendar-list-event-time",
                                        children: listTimeLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                        lineNumber: 368,
                                        columnNumber: 66
                                    }, ("TURBOPACK compile-time value", void 0)) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "calendar-list-event-badges",
                                children: [
                                    !isTeacher || teacherSettings.showEventTypeBadges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `calendar-event-type calendar-event-type--${lessonType}`,
                                        children: typeLabelLong
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                    (!isTeacher || teacherSettings.showRecurringBadge) && isRecurringWeekly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "calendar-event-recurring",
                                        children: isEn ? 'Recurring' : 'Повтор'
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                        lineNumber: 375,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                    (!isTeacher || teacherSettings.showEventStatusBadges) && statusLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "calendar-event-status",
                                        children: statusLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                        lineNumber: 378,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `calendar-list-event-title ${titleLinesClass}`,
                        children: displayTitle
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 364,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `calendar-event-inner ${isTimeGridView ? 'calendar-event-inner--timegrid' : ''} ${isTeacher && teacherSettings.dimConductedEvents && isConducted ? 'calendar-event-inner--muted' : ''}`,
            children: [
                (!isTeacher || teacherSettings.showEventTime) && timeText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "calendar-event-time",
                    children: timeText
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                    lineNumber: 389,
                    columnNumber: 72
                }, ("TURBOPACK compile-time value", void 0)) : null,
                !isTimeGridView && (!isTeacher || teacherSettings.showEventTypeBadges || teacherSettings.showEventStatusBadges) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "calendar-event-meta",
                    children: [
                        !isTeacher || teacherSettings.showEventTypeBadges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `calendar-event-type calendar-event-type--${lessonType}`,
                            children: typeLabelShort
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 393,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : null,
                        (!isTeacher || teacherSettings.showRecurringBadge) && isRecurringWeekly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "calendar-event-recurring",
                            children: isEn ? 'Recurring' : 'Повтор'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 395,
                            columnNumber: 88
                        }, ("TURBOPACK compile-time value", void 0)) : null,
                        (!isTeacher || teacherSettings.showEventStatusBadges) && statusLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "calendar-event-status",
                            children: statusLabel
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 396,
                            columnNumber: 85
                        }, ("TURBOPACK compile-time value", void 0)) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                    lineNumber: 391,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `calendar-event-title ${titleLinesClass}`,
                    children: [
                        (isTimeGridView || isMonthView) && (!isTeacher || teacherSettings.showEventTypeBadges) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `calendar-event-type-inline calendar-event-type-inline--${lessonType}`,
                            children: typeLabelShort
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 401,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : null,
                        displayTitle
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
            lineNumber: 388,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    const visibleEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SchedulePage.useMemo[visibleEvents]": ()=>{
            const term = searchTerm.trim().toLowerCase();
            if (!term) {
                return events;
            }
            return events.filter({
                "SchedulePage.useMemo[visibleEvents]": (event)=>event.title.toLowerCase().includes(term)
            }["SchedulePage.useMemo[visibleEvents]"]);
        }
    }["SchedulePage.useMemo[visibleEvents]"], [
        events,
        searchTerm
    ]);
    const isMobileCalendar = viewportWidth <= 640;
    const isMonthView = currentViewType === 'dayGridMonth';
    const calendarHeaderToolbar = isMobileCalendar ? {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,listWeek,timeGridWeek'
    } : {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SchedulePage.useEffect": ()=>{
            const api = calendarRef.current?.getApi();
            if (!api) {
                return;
            }
            const currentView = api.view.type;
            if (isMobileCalendar && currentView === 'dayGridMonth') {
                api.changeView(teacherSettings.mobileView);
            }
        }
    }["SchedulePage.useEffect"], [
        isMobileCalendar,
        teacherSettings.mobileView
    ]);
    const initialView = isTeacher ? isMobileCalendar ? teacherSettings.mobileView : teacherSettings.desktopView : isMobileCalendar ? 'timeGridWeek' : 'dayGridMonth';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "schedule-page",
        ref: containerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `schedule-toolbar ${isManager ? 'schedule-toolbar--manager' : ''}`,
                children: isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "schedule-controls schedule-controls--search",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "scheduleSearch",
                                    children: isEn ? 'Search lessons' : 'Поиск по занятиям'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "scheduleSearch",
                                    type: "text",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    placeholder: isEn ? 'Topic, course, status...' : 'Тема, курс, отметка статуса...'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: isEn ? 'Click a day in calendar to add a lesson.' : 'Нажмите на день календаря, чтобы добавить новое занятие.'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        !isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "schedule-controls schedule-controls--teacher",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "teacherFilter",
                                    children: isEn ? 'Teacher' : 'Преподаватель'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 458,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "teacherFilter",
                                    value: selectedTeacherId,
                                    onChange: (e)=>{
                                        if (e.target.value === 'all') {
                                            setSelectedTeacherId('all');
                                            return;
                                        }
                                        setSelectedTeacherId(Number(e.target.value));
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "all",
                                            children: isEn ? 'All teachers' : 'Все преподаватели'
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                            lineNumber: 470,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        teacherOptions.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: teacher.id,
                                                children: [
                                                    teacher.second_name,
                                                    " ",
                                                    teacher.first_name
                                                ]
                                            }, teacher.id, true, {
                                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                                lineNumber: 472,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 459,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 457,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        !isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "schedule-controls schedule-controls--teacher",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "teacherFilter",
                                    children: isEn ? 'Teacher' : 'Преподаватель'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 484,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "teacherFilter",
                                    value: selectedTeacherId,
                                    onChange: (e)=>{
                                        if (e.target.value === 'all') {
                                            setSelectedTeacherId('all');
                                            return;
                                        }
                                        setSelectedTeacherId(Number(e.target.value));
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "all",
                                            children: isEn ? 'All teachers' : 'Все преподаватели'
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        teacherOptions.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: teacher.id,
                                                children: [
                                                    teacher.second_name,
                                                    " ",
                                                    teacher.first_name
                                                ]
                                            }, teacher.id, true, {
                                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                                lineNumber: 498,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 485,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 483,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "schedule-controls schedule-controls--search",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "scheduleSearch",
                                    children: isEn ? 'Search lessons' : 'Поиск по занятиям'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "scheduleSearch",
                                    type: "text",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    placeholder: isEn ? 'Topic, course, status...' : 'Тема, курс, отметка статуса...'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: isEn ? 'Click a day in calendar to add a lesson.' : 'Нажмите на день календаря, чтобы добавить новое занятие.'
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "schedule-mobile-filter",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "teacherFilterMobile",
                        children: isEn ? 'Teacher' : 'Преподаватель'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 523,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "teacherFilterMobile",
                        value: selectedTeacherId,
                        onChange: (e)=>{
                            if (e.target.value === 'all') {
                                setSelectedTeacherId('all');
                                return;
                            }
                            setSelectedTeacherId(Number(e.target.value));
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: isEn ? 'All teachers' : 'Все преподаватели'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            teacherOptions.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: teacher.id,
                                    children: [
                                        teacher.second_name,
                                        " ",
                                        teacher.first_name
                                    ]
                                }, teacher.id, true, {
                                    fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 524,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 522,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ref: calendarRef,
                datesSet: (arg)=>setCurrentViewType(arg.view.type),
                dateClick: handleDateClick,
                eventClick: handleEventClick,
                eventDrop: handleEventDrop,
                editable: true,
                eventStartEditable: true,
                eventDurationEditable: false,
                fixedMirrorParent: document.body,
                selectable: true,
                plugins: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$timegrid$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$interaction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                ],
                initialView: initialView,
                headerToolbar: calendarHeaderToolbar,
                views: {
                    timeGridWeek: {
                        dayHeaderFormat: {
                            weekday: isMobileCalendar ? 'short' : 'long'
                        }
                    },
                    dayGridMonth: {
                        dayHeaderFormat: {
                            weekday: isMobileCalendar ? 'narrow' : 'long'
                        },
                        dayMaxEventRows: isTeacher ? teacherSettings.monthEventRows : 2,
                        height: 'auto',
                        contentHeight: 'auto'
                    }
                },
                locale: isEn ? 'en' : 'ru',
                events: visibleEvents,
                eventContent: renderEventContent,
                allDayContent: "Весь день",
                height: isMonthView ? 'auto' : '82vh',
                firstDay: isTeacher ? teacherSettings.firstDay : 1,
                weekends: isTeacher ? teacherSettings.showWeekends : true,
                timeZone: "local",
                slotDuration: isTeacher ? teacherSettings.slotDuration : '00:30:00',
                snapDuration: isTeacher ? teacherSettings.snapDuration : '00:15:00',
                slotMinTime: isTeacher ? teacherSettings.dayStartTime : '00:00:00',
                slotMaxTime: isTeacher ? teacherSettings.dayEndTime : '24:00:00',
                scrollTime: isTeacher ? teacherSettings.initialScrollTime : '08:00:00',
                nowIndicator: isTeacher ? teacherSettings.showNowIndicator : true,
                slotEventOverlap: !isMobileCalendar,
                eventMinHeight: isMobileCalendar ? 34 : 22,
                eventShortHeight: isMobileCalendar ? 26 : 18,
                displayEventTime: true,
                displayEventEnd: true,
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: isTeacher ? teacherSettings.timeFormat === '12h' : false
                },
                eventMaxStack: isTeacher ? teacherSettings.denseEvents ? 4 : isMobileCalendar ? 3 : 2 : isMobileCalendar ? 3 : 2,
                eventDisplay: "block",
                expandRows: true,
                fixedWeekCount: !isMobileCalendar,
                buttonText: {
                    today: isEn ? 'Today' : 'Сегодня',
                    month: isEn ? isMobileCalendar ? 'Mon' : 'Month' : isMobileCalendar ? 'Мес' : 'Месяц',
                    week: isEn ? isMobileCalendar ? 'Wk' : 'Week' : isMobileCalendar ? 'Нед' : 'Неделя',
                    day: isEn ? 'Day' : 'День',
                    list: isEn ? 'List' : 'Список'
                }
            }, `calendar-${isTeacher ? 'teacher' : 'other'}-${isMobileCalendar ? 'mobile' : 'desktop'}-${initialView}-${teacherSettings.slotDuration}-${teacherSettings.snapDuration}-${teacherSettings.firstDay}-${teacherSettings.timeFormat}-${teacherSettings.showWeekends}-${teacherSettings.denseEvents}-${teacherSettings.dayStartTime}-${teacherSettings.dayEndTime}-${teacherSettings.initialScrollTime}-${teacherSettings.monthEventRows}-${teacherSettings.showNowIndicator}`, false, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            (!isTeacher || teacherSettings.showLegend) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "schedule-legend",
                children: courses.map((course)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "schedule-legend-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "schedule-legend-dot",
                                style: {
                                    backgroundColor: getCourseColor(course.name)
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                                lineNumber: 612,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            course.name
                        ]
                    }, course.id, true, {
                        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                        lineNumber: 611,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 609,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            visibleEvents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "schedule-empty-state",
                children: isEn ? 'No lessons found. Try changing filters or add a new lesson.' : 'Занятий не найдено. Попробуйте изменить фильтры или добавить новое занятие.'
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
                lineNumber: 620,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Schedule/SchedulePage.tsx",
        lineNumber: 440,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SchedulePage, "3uzdbQ/sj3seRB7FhNLM2wzWT5o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$AppLanguage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppLanguage"]
    ];
});
_c = SchedulePage;
var _c;
__turbopack_context__.k.register(_c, "SchedulePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/Schedule/SchedulePage.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/pages/Schedule/SchedulePage.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_pages_Schedule_SchedulePage_tsx_0-mapaa._.js.map