(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/Account/AvatarCropModal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "AvatarCropModal-module___yrTRG__actions",
  "cancel": "AvatarCropModal-module___yrTRG__cancel",
  "controls": "AvatarCropModal-module___yrTRG__controls",
  "cropArea": "AvatarCropModal-module___yrTRG__cropArea",
  "header": "AvatarCropModal-module___yrTRG__header",
  "modal": "AvatarCropModal-module___yrTRG__modal",
  "overlay": "AvatarCropModal-module___yrTRG__overlay",
  "save": "AvatarCropModal-module___yrTRG__save",
});
}),
"[project]/src/pages/Account/AvatarCropModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarCropModal",
    ()=>AvatarCropModal,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-easy-crop/index.module.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/Account/AvatarCropModal.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const createImage = (url)=>new Promise((resolve, reject)=>{
        const image = new Image();
        image.onload = ()=>resolve(image);
        image.onerror = reject;
        image.src = url;
    });
const getCroppedAvatarFile = async (imageSrc, cropArea)=>{
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const size = Math.max(256, Math.round(Math.max(cropArea.width, cropArea.height)));
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Canvas context error');
    }
    context.drawImage(image, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, size, size);
    const blob = await new Promise((resolve)=>{
        canvas.toBlob(resolve, 'image/jpeg', 0.92);
    });
    if (!blob) {
        throw new Error('Blob create error');
    }
    return new File([
        blob
    ], `avatar-${Date.now()}.jpg`, {
        type: 'image/jpeg'
    });
};
const AvatarCropModal = ({ imageSrc, isSaving, onCancel, onSave })=>{
    _s();
    const [crop, setCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const zoomLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AvatarCropModal.useMemo[zoomLabel]": ()=>`${Math.round(zoom * 100)}%`
    }["AvatarCropModal.useMemo[zoomLabel]"], [
        zoom
    ]);
    const handleSave = async ()=>{
        if (!croppedAreaPixels) return;
        const file = await getCroppedAvatarFile(imageSrc, croppedAreaPixels);
        await onSave(file);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Обрезка аватарки",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modal,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Обрезка аватарки"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCancel,
                            disabled: isSaving,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cropArea,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        image: imageSrc,
                        crop: crop,
                        zoom: zoom,
                        aspect: 1,
                        cropShape: "round",
                        showGrid: false,
                        onCropChange: setCrop,
                        onZoomChange: setZoom,
                        onCropComplete: (_, croppedArea)=>setCroppedAreaPixels(croppedArea)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "avatarZoom",
                            children: [
                                "Масштаб: ",
                                zoomLabel
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "avatarZoom",
                            type: "range",
                            min: 1,
                            max: 3,
                            step: 0.05,
                            value: zoom,
                            onChange: (event)=>setZoom(Number(event.target.value)),
                            disabled: isSaving
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancel,
                            onClick: onCancel,
                            disabled: isSaving,
                            children: "Отмена"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].save,
                            onClick: handleSave,
                            disabled: isSaving || !croppedAreaPixels,
                            children: isSaving ? 'Сохранение...' : 'Сохранить'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/Account/AvatarCropModal.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AvatarCropModal, "lyB3Jhljp2iLDMHNxwNhfpkUYFA=");
_c = AvatarCropModal;
const __TURBOPACK__default__export__ = AvatarCropModal;
var _c;
__turbopack_context__.k.register(_c, "AvatarCropModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/Account/AccountPage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "AccountPage-module__8rLJKq__avatar",
  "avatarEditButton": "AccountPage-module__8rLJKq__avatarEditButton",
  "avatarWrap": "AccountPage-module__8rLJKq__avatarWrap",
  "badge": "AccountPage-module__8rLJKq__badge",
  "badgePending": "AccountPage-module__8rLJKq__badgePending",
  "badgeSuccess": "AccountPage-module__8rLJKq__badgeSuccess",
  "badges": "AccountPage-module__8rLJKq__badges",
  "cancelButton": "AccountPage-module__8rLJKq__cancelButton",
  "card": "AccountPage-module__8rLJKq__card",
  "cardHead": "AccountPage-module__8rLJKq__cardHead",
  "editButton": "AccountPage-module__8rLJKq__editButton",
  "editHint": "AccountPage-module__8rLJKq__editHint",
  "editPanel": "AccountPage-module__8rLJKq__editPanel",
  "editPanelClosing": "AccountPage-module__8rLJKq__editPanelClosing",
  "field": "AccountPage-module__8rLJKq__field",
  "fieldInline": "AccountPage-module__8rLJKq__fieldInline",
  "formActions": "AccountPage-module__8rLJKq__formActions",
  "gridMain": "AccountPage-module__8rLJKq__gridMain",
  "hero": "AccountPage-module__8rLJKq__hero",
  "heroMain": "AccountPage-module__8rLJKq__heroMain",
  "heroStats": "AccountPage-module__8rLJKq__heroStats",
  "heroSub": "AccountPage-module__8rLJKq__heroSub",
  "hiddenFileInput": "AccountPage-module__8rLJKq__hiddenFileInput",
  "inlineLink": "AccountPage-module__8rLJKq__inlineLink",
  "inputWrap": "AccountPage-module__8rLJKq__inputWrap",
  "inputWrapFull": "AccountPage-module__8rLJKq__inputWrapFull",
  "kicker": "AccountPage-module__8rLJKq__kicker",
  "loading": "AccountPage-module__8rLJKq__loading",
  "overview": "AccountPage-module__8rLJKq__overview",
  "overviewCard": "AccountPage-module__8rLJKq__overviewCard",
  "page": "AccountPage-module__8rLJKq__page",
  "profileEditorGrid": "AccountPage-module__8rLJKq__profileEditorGrid",
  "profileEditorHide": "AccountPage-module__8rLJKq__profileEditorHide",
  "profileEditorReveal": "AccountPage-module__8rLJKq__profileEditorReveal",
  "profileReadOnly": "AccountPage-module__8rLJKq__profileReadOnly",
  "saveButton": "AccountPage-module__8rLJKq__saveButton",
  "shortcutGrid": "AccountPage-module__8rLJKq__shortcutGrid",
  "shortcutLink": "AccountPage-module__8rLJKq__shortcutLink",
  "shortcuts": "AccountPage-module__8rLJKq__shortcuts",
  "shortcutsHead": "AccountPage-module__8rLJKq__shortcutsHead",
  "socialEditor": "AccountPage-module__8rLJKq__socialEditor",
  "socialEditorGrid": "AccountPage-module__8rLJKq__socialEditorGrid",
  "socialHintBox": "AccountPage-module__8rLJKq__socialHintBox",
  "socialIconBadge": "AccountPage-module__8rLJKq__socialIconBadge",
  "socialIconLink": "AccountPage-module__8rLJKq__socialIconLink",
  "socialIconLinkDisabled": "AccountPage-module__8rLJKq__socialIconLinkDisabled",
  "socialIconsGrid": "AccountPage-module__8rLJKq__socialIconsGrid",
  "socialIconsHint": "AccountPage-module__8rLJKq__socialIconsHint",
  "socialMax": "AccountPage-module__8rLJKq__socialMax",
  "socialProfiles": "AccountPage-module__8rLJKq__socialProfiles",
  "socialTelegram": "AccountPage-module__8rLJKq__socialTelegram",
  "socialVk": "AccountPage-module__8rLJKq__socialVk",
  "socialWhatsapp": "AccountPage-module__8rLJKq__socialWhatsapp",
  "stat": "AccountPage-module__8rLJKq__stat",
});
}),
"[project]/src/pages/Account/AccountPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountPage",
    ()=>AccountPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/free-brands-svg-icons/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Account/AvatarCropModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/Account/AccountPage.module.css [app-client] (css module)");
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
const formatDate = (value)=>{
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
};
const AccountPage = ()=>{
    _s();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarSaving, setAvatarSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditClosing, setIsEditClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarSrcForCrop, setAvatarSrcForCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        first_name: '',
        second_name: '',
        patronymic: '',
        phone: '',
        vk_contact: '',
        telegram_contact: '',
        whatsapp_contact: '',
        max_contact: ''
    });
    const normalizeVkLink = (value)=>{
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
        const clean = trimmed.replace(/^@/, '').replace(/^vk\.com\//i, '');
        return `https://vk.com/${clean}`;
    };
    const normalizeTelegramLink = (value)=>{
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
        const clean = trimmed.replace(/^@/, '').replace(/^t\.me\//i, '');
        return `https://t.me/${clean}`;
    };
    const normalizeWhatsappLink = (value)=>{
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
        const digits = trimmed.replace(/\D/g, '');
        return digits ? `https://wa.me/${digits}` : '';
    };
    const normalizeMaxLink = (value)=>{
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
        const clean = trimmed.replace(/^@/, '');
        return `https://max.ru/${clean}`;
    };
    const setFormFromUser = (value)=>{
        setForm({
            email: value.email ?? '',
            first_name: value.first_name ?? '',
            second_name: value.second_name ?? '',
            patronymic: value.patronymic ?? '',
            phone: value.phone ?? '',
            vk_contact: value.vk_contact ?? '',
            telegram_contact: value.telegram_contact ?? '',
            whatsapp_contact: value.whatsapp_contact ?? '',
            max_contact: value.max_contact ?? ''
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPage.useEffect": ()=>{
            const stored = localStorage.getItem('user');
            if (!stored) {
                window.location.href = '/login';
                return;
            }
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setFormFromUser(parsed);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].me().then({
                "AccountPage.useEffect": (res)=>{
                    setUser(res.data);
                    setFormFromUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
            }["AccountPage.useEffect"]).catch({
                "AccountPage.useEffect": ()=>{
                    notify('error', 'Ошибка', 'Не удалось загрузить актуальные данные аккаунта.');
                }
            }["AccountPage.useEffect"]);
            return ({
                "AccountPage.useEffect": ()=>{
                    if (closeTimerRef.current) {
                        window.clearTimeout(closeTimerRef.current);
                    }
                }
            })["AccountPage.useEffect"];
        }
    }["AccountPage.useEffect"], []);
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
            children: "Загрузка профиля..."
        }, void 0, false, {
            fileName: "[project]/src/pages/Account/AccountPage.tsx",
            lineNumber: 117,
            columnNumber: 54
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/Account/AccountPage.tsx",
        lineNumber: 117,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0));
    const roleName = user.role.name.toLowerCase();
    const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
    const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
    const isManager = roleName.includes('менеджер') || roleName.includes('manager');
    const previewFirstName = form.first_name || user.first_name;
    const previewSecondName = form.second_name || user.second_name;
    const previewPatronymic = form.patronymic || user.patronymic || '';
    const fullName = `${previewSecondName} ${previewFirstName} ${previewPatronymic}`.trim();
    const initials = `${previewFirstName[0] ?? ''}${previewSecondName[0] ?? ''}`.toUpperCase();
    const avatarImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveApiUrl"])(user.avatar_url);
    const profileParts = [
        form.email || user.email,
        form.phone || user.phone,
        form.patronymic || user.patronymic
    ];
    const profileCompleteness = Math.round(profileParts.filter(Boolean).length / profileParts.length * 100);
    const quickLinks = isTeacher ? [
        {
            label: 'Календарь',
            path: '/calendar',
            hint: 'Расписание и занятия'
        },
        {
            label: 'Мои ученики',
            path: '/my-students',
            hint: 'Список и карточки учеников'
        },
        {
            label: 'Аналитика',
            path: '/analytics',
            hint: 'Показатели по занятиям'
        }
    ] : [
        {
            label: 'Клиенты',
            path: '/clients',
            hint: 'Карточки и контакты'
        },
        {
            label: 'Календарь',
            path: '/calendar',
            hint: 'Планирование занятий'
        },
        {
            label: 'Аналитика',
            path: '/analytics',
            hint: 'Отчеты и метрики'
        },
        ...isAdmin || isManager ? [
            {
                label: 'Отработки',
                path: '/makeups',
                hint: 'Назначение и контроль'
            }
        ] : []
    ];
    const socialProfiles = [
        {
            id: 'vk',
            label: 'ВКонтакте',
            href: normalizeVkLink(user.vk_contact ?? ''),
            short: user.vk_contact?.trim() || 'Не указан',
            helper: 'Профиль или короткое имя',
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialVk
        },
        {
            id: 'telegram',
            label: 'Telegram',
            href: normalizeTelegramLink(user.telegram_contact ?? ''),
            short: user.telegram_contact?.trim() || 'Не указан',
            helper: 'Ссылка или @username',
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialTelegram
        },
        {
            id: 'whatsapp',
            label: 'WhatsApp',
            href: normalizeWhatsappLink(user.whatsapp_contact ?? ''),
            short: user.whatsapp_contact?.trim() || 'Не указан',
            helper: 'Телефон или ссылка',
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialWhatsapp
        },
        {
            id: 'max',
            label: 'MAX',
            href: normalizeMaxLink(user.max_contact ?? ''),
            short: user.max_contact?.trim() || 'Не указан',
            helper: 'Профиль MAX',
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialMax
        }
    ];
    const socialIconById = {
        vk: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faVk"]
        }, void 0, false, {
            fileName: "[project]/src/pages/Account/AccountPage.tsx",
            lineNumber: 180,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        telegram: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faTelegram"]
        }, void 0, false, {
            fileName: "[project]/src/pages/Account/AccountPage.tsx",
            lineNumber: 181,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        whatsapp: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faWhatsapp"]
        }, void 0, false, {
            fileName: "[project]/src/pages/Account/AccountPage.tsx",
            lineNumber: 182,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        max: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: "/brands/max.ico",
            alt: "",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/src/pages/Account/AccountPage.tsx",
            lineNumber: 183,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0))
    };
    const hasProfileChanges = form.email.trim() !== (user.email ?? '').trim() || form.first_name.trim() !== (user.first_name ?? '').trim() || form.second_name.trim() !== (user.second_name ?? '').trim() || form.patronymic.trim() !== (user.patronymic ?? '').trim() || form.phone.trim() !== (user.phone ?? '').trim() || form.vk_contact.trim() !== (user.vk_contact ?? '').trim() || form.telegram_contact.trim() !== (user.telegram_contact ?? '').trim() || form.whatsapp_contact.trim() !== (user.whatsapp_contact ?? '').trim() || form.max_contact.trim() !== (user.max_contact ?? '').trim();
    const closeEditPanel = ()=>{
        if (!isEditMode) return;
        setIsEditClosing(true);
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
        }
        closeTimerRef.current = window.setTimeout(()=>{
            setIsEditMode(false);
            setIsEditClosing(false);
            closeTimerRef.current = null;
        }, 190);
    };
    const handleSaveContacts = async ()=>{
        try {
            setSaving(true);
            const payload = {
                email: form.email.trim() || null,
                first_name: form.first_name.trim() || null,
                second_name: form.second_name.trim() || null,
                patronymic: form.patronymic.trim() || null,
                phone: form.phone.trim() || null,
                vk_contact: form.vk_contact.trim() || null,
                telegram_contact: form.telegram_contact.trim() || null,
                whatsapp_contact: form.whatsapp_contact.trim() || null,
                max_contact: form.max_contact.trim() || null
            };
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].updateMe(payload);
            setUser(res.data);
            setFormFromUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            window.dispatchEvent(new Event('user-updated'));
            notify('success', 'Сохранено', 'Профиль и контакты обновлены.');
            closeEditPanel();
        } catch  {
            notify('error', 'Ошибка', 'Не удалось сохранить контакты.');
        } finally{
            setSaving(false);
        }
    };
    const handleStartEdit = ()=>{
        if (!user) return;
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setIsEditClosing(false);
        setFormFromUser(user);
        setIsEditMode(true);
    };
    const handleCancelEdit = ()=>{
        if (!user) return;
        setFormFromUser(user);
        closeEditPanel();
    };
    const handleAvatarFileSelect = (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            notify('error', 'Ошибка', 'Выберите файл изображения.');
            event.target.value = '';
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            notify('error', 'Ошибка', 'Размер файла не должен превышать 5 МБ.');
            event.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>{
            setAvatarSrcForCrop(String(reader.result ?? ''));
            setIsAvatarModalOpen(true);
        };
        reader.onerror = ()=>{
            notify('error', 'Ошибка', 'Не удалось прочитать файл.');
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    };
    const handleAvatarSave = async (croppedFile)=>{
        try {
            setAvatarSaving(true);
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].uploadMyAvatar(croppedFile);
            setUser(res.data);
            setFormFromUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            window.dispatchEvent(new Event('user-updated'));
            setIsAvatarModalOpen(false);
            setAvatarSrcForCrop(null);
            notify('success', 'Сохранено', 'Аватарка обновлена.');
        } catch  {
            notify('error', 'Ошибка', 'Не удалось загрузить аватарку.');
        } finally{
            setAvatarSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hero,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar,
                                children: avatarImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: avatarImage,
                                    alt: "Аватар пользователя"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : initials
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarEditButton,
                                onClick: ()=>fileInputRef.current?.click(),
                                "aria-label": "Изменить аватар",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "13",
                                    height: "13",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m12 20 3-3m0 0 3-3m-3 3H5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m19 10-1.5-1.5a2.1 2.1 0 0 0-3 0L8 15v3h3l6.5-6.5a2.1 2.1 0 0 0 0-3Z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                    lineNumber: 315,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hiddenFileInput,
                                type: "file",
                                accept: "image/png,image/jpeg,image/webp",
                                onChange: handleAvatarFileSelect
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMain,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kicker,
                                children: "Личный кабинет"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: fullName
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroSub,
                                children: "Управляйте профилем и переходите в рабочие разделы из одной страницы."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badges,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                                        children: user.role.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge} ${user.is_accepted ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgePending}`,
                                        children: user.is_accepted ? 'Доступ подтвержден' : 'Ожидает подтверждения'
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroStats,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stat,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Профиль"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            profileCompleteness,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stat,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ID"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            "#",
                                            user.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overview,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overviewCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Дата регистрации"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: formatDate(user.created_at)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overviewCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Статус"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: user.is_accepted ? 'Активный' : 'Ожидает подтверждения'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overviewCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Роль"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: user.role.name
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editPanel} ${isEditClosing ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editPanelClosing : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHead,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Редактирование профиля"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Account/AccountPage.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 368,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editHint,
                        children: "Заполните основные данные и каналы связи, затем сохраните изменения."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileEditorGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapFull}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        value: form.email,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    email: e.target.value
                                                })),
                                        placeholder: "name@example.com"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapFull}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Телефон"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.phone,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    phone: e.target.value
                                                })),
                                        placeholder: "+7..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Имя"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.first_name,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    first_name: e.target.value
                                                })),
                                        placeholder: "Введите имя"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 390,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Фамилия"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.second_name,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    second_name: e.target.value
                                                })),
                                        placeholder: "Введите фамилию"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Отчество"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 407,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.patronymic,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    patronymic: e.target.value
                                                })),
                                        placeholder: "Введите отчество"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 406,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialEditor,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Контакты для связи"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialEditorGrid,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "ВК"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.vk_contact,
                                                onChange: (e)=>setForm((prev)=>({
                                                            ...prev,
                                                            vk_contact: e.target.value
                                                        })),
                                                placeholder: "https://vk.com/username или username"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 421,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Telegram"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.telegram_contact,
                                                onChange: (e)=>setForm((prev)=>({
                                                            ...prev,
                                                            telegram_contact: e.target.value
                                                        })),
                                                placeholder: "https://t.me/username или @username"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "WhatsApp"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 436,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.whatsapp_contact,
                                                onChange: (e)=>setForm((prev)=>({
                                                            ...prev,
                                                            whatsapp_contact: e.target.value
                                                        })),
                                                placeholder: "+79991234567 или wa.me/79991234567"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrap,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "MAX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 444,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.max_contact,
                                                onChange: (e)=>setForm((prev)=>({
                                                            ...prev,
                                                            max_contact: e.target.value
                                                        })),
                                                placeholder: "https://max.ru/username или username"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 416,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancelButton,
                                disabled: saving,
                                onClick: handleCancelEdit,
                                children: "Отмена"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 455,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saveButton,
                                disabled: saving || !hasProfileChanges,
                                onClick: handleSaveContacts,
                                children: saving ? 'Сохранение...' : 'Сохранить профиль'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 367,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gridMain,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHead,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Профиль и контакты"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editButton,
                                        onClick: handleStartEdit,
                                        "aria-label": "Редактировать профиль",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "15",
                                                height: "15",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M12 20h9"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 470,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Редактировать"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileReadOnly,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 478,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: user.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 478,
                                                columnNumber: 67
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Телефон"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 479,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: user.phone ?? 'не указан'
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 479,
                                                columnNumber: 69
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Имя"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 480,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: user.first_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 480,
                                                columnNumber: 65
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Фамилия"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 481,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: user.second_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 481,
                                                columnNumber: 69
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Отчество"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 482,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: user.patronymic ?? 'не указано'
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 482,
                                                columnNumber: 70
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 482,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInline,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Ставка"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 483,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    user.income_per_hour,
                                                    " / час"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 483,
                                                columnNumber: 68
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Параметры аккаунта"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 488,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ID пользователя"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            "#",
                                            user.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Дата регистрации"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 494,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: formatDate(user.created_at)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 495,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Роль в системе"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: user.role.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 499,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialProfiles,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Связаться через соцсети"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconsGrid,
                                        children: socialProfiles.map((profile)=>profile.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: profile.href,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconLink} ${profile.className}`,
                                                title: `${profile.label}: ${profile.short}`,
                                                "aria-label": `Открыть ${profile.label}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconBadge,
                                                    children: socialIconById[profile.id]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, profile.id, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 506,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconLink} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconLinkDisabled} ${profile.className}`,
                                                disabled: true,
                                                title: `${profile.label}: не указано`,
                                                "aria-label": `${profile.label} не указан`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconBadge,
                                                    children: socialIconById[profile.id]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, profile.id, false, {
                                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                                lineNumber: 518,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 503,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialIconsHint,
                                        children: "Наведите на иконку, чтобы увидеть подпись."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shortcuts,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shortcutsHead,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Быстрые разделы"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 538,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Откройте нужный рабочий раздел в один клик."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 539,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 537,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shortcutGrid,
                        children: quickLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.path,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shortcutLink,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.hint
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                        lineNumber: 545,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, item.path, true, {
                                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                                lineNumber: 543,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Account/AccountPage.tsx",
                        lineNumber: 541,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isAvatarModalOpen && avatarSrcForCrop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AvatarCropModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                imageSrc: avatarSrcForCrop,
                isSaving: avatarSaving,
                onCancel: ()=>{
                    if (avatarSaving) return;
                    setIsAvatarModalOpen(false);
                    setAvatarSrcForCrop(null);
                },
                onSave: handleAvatarSave
            }, void 0, false, {
                fileName: "[project]/src/pages/Account/AccountPage.tsx",
                lineNumber: 552,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Account/AccountPage.tsx",
        lineNumber: 301,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AccountPage, "JeUkT/xMcjDWDoKby2Nqs0cdbB4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
    ];
});
_c = AccountPage;
var _c;
__turbopack_context__.k.register(_c, "AccountPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/account/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Account/AccountPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Account$2f$AccountPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/account/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0a.uvbt._.js.map