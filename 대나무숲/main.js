// ======================================================
// 우리 반 톡 - main.js
// ======================================================


// ======================================================
// 상태
// ======================================================

let currentUser = null;
let currentProfile = null;

let replyTarget = null;

let realtimeChannel = null;
let presenceChannel = null;


// ======================================================
// DOM
// ======================================================

const loginScreen =
    document.getElementById("loginScreen");

const chatScreen =
    document.getElementById("chatScreen");

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("emailInput");

const passwordInput =
    document.getElementById("passwordInput");

const loginButton =
    document.getElementById("loginButton");

const loginError =
    document.getElementById("loginError");

const logoutButton =
    document.getElementById("logoutButton");

const messages =
    document.getElementById("messages");

const messageForm =
    document.getElementById("messageForm");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const replyBar =
    document.getElementById("replyBar");

const replyText =
    document.getElementById("replyText");

const cancelReplyButton =
    document.getElementById("cancelReplyButton");

const adminButton =
    document.getElementById("adminButton");

const adminPanel =
    document.getElementById("adminPanel");

const closeAdminButton =
    document.getElementById("closeAdminButton");

const adminUsers =
    document.getElementById("adminUsers");

const onlineText =
    document.getElementById("onlineText");

const emptyMessage =
    document.getElementById("emptyMessage");


// ======================================================
// 초기화
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    initialize
);


async function initialize() {

    try {

        const {
            data: {
                session
            }
        } = await db.auth.getSession();


        if (session) {

            currentUser =
                session.user;

            await enterChat();

        } else {

            showLogin();

        }


        db.auth.onAuthStateChange(
            async (
                event,
                session
            ) => {

                if (session) {

                    currentUser =
                        session.user;

                    await enterChat();

                } else {

                    currentUser = null;

                    currentProfile = null;

                    leaveRealtime();

                    leavePresence();

                    showLogin();

                }

            }
        );

    } catch (error) {

        console.error(
            "초기화 오류:",
            error
        );

        showLogin();

    }

}


// ======================================================
// 로그인
// ======================================================

loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        loginError.textContent = "";


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

            loginError.textContent =
                "이메일과 비밀번호를 입력해주세요.";

            return;

        }


        loginButton.disabled = true;

        loginButton.textContent =
            "로그인 중...";


        try {

            const {
                error
            } = await db.auth.signInWithPassword({
                email,
                password
            });


            if (error) {

                loginError.textContent =
                    getAuthErrorMessage(
                        error
                    );

                return;

            }

        } catch (error) {

            console.error(
                "로그인 오류:",
                error
            );

            loginError.textContent =
                "로그인 중 오류가 발생했습니다.";

        } finally {

            loginButton.disabled = false;

            loginButton.textContent =
                "로그인";

        }

    }
);


// ======================================================
// Auth 오류 메시지
// ======================================================

function getAuthErrorMessage(
    error
) {

    const message =
        error?.message?.toLowerCase() || "";


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {

        return "이메일 또는 비밀번호가 올바르지 않습니다.";

    }


    if (
        message.includes(
            "email not confirmed"
        )
    ) {

        return "이메일 인증이 완료되지 않은 계정입니다.";

    }


    return (
        error?.message ||
        "로그인에 실패했습니다."
    );

}


// ======================================================
// 채팅 입장
// ======================================================

async function enterChat() {

    loginScreen.classList.add(
        "hidden"
    );

    chatScreen.classList.remove(
        "hidden"
    );


    await loadProfile();

    await loadMessages();

    setupRealtime();

    setupPresence();

}


// ======================================================
// 프로필 불러오기
// ======================================================

async function loadProfile() {

    if (!currentUser) {

        return;

    }


    const {
        data,
        error
    } = await db
        .from("profiles")
        .select("*")
        .eq(
            "id",
            currentUser.id
        )
        .maybeSingle();


    if (error) {

        console.error(
            "프로필 불러오기 실패:",
            error
        );

        currentProfile = null;

        adminButton.classList.add(
            "hidden"
        );

        return;

    }


    currentProfile = data;


    if (
        currentProfile &&
        currentProfile.is_admin === true
    ) {

        adminButton.classList.remove(
            "hidden"
        );

    } else {

        adminButton.classList.add(
            "hidden"
        );

    }

}


// ======================================================
// 메시지 불러오기
// ======================================================

async function loadMessages() {

    if (!currentUser) {

        return;

    }


    const {
        data,
        error
    } = await db
        .from("messages")
        .select(`
            *,
            profiles (
                display_name
            )
        `)
        .order(
            "created_at",
            {
                ascending: true
            }
        );


    if (error) {

        console.error(
            "메시지 불러오기 실패:",
            error
        );

        return;

    }


    messages.innerHTML = "";


    if (
        !data ||
        data.length === 0
    ) {

        messages.appendChild(
            emptyMessage
        );

        return;

    }


    data.forEach(
        message => {
            renderMessage(
                message
            );
        }
    );


    scrollToBottom();

}


// ======================================================
// 메시지 렌더링
// ======================================================

function renderMessage(
    message
) {

    const isMine =
        message.user_id ===
        currentUser.id;


    // ----------------------------------------------
    // 전체 메시지
    // ----------------------------------------------

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message" +
        (
            isMine
                ? " mine"
                : ""
        );


    // ----------------------------------------------
    // 내용 Wrapper
    // ----------------------------------------------

    const contentWrapper =
        document.createElement(
            "div"
        );

    contentWrapper.className =
        "message-content-wrapper";


    // ----------------------------------------------
    // 이름
    // ----------------------------------------------

    const name =
        document.createElement(
            "div"
        );

    name.className =
        "message-name";


    const displayName =
        message.profiles?.display_name ||
        "사용자";


    name.textContent =
        displayName;


    contentWrapper.appendChild(
        name
    );


    // ----------------------------------------------
    // 답장 대상
    // ----------------------------------------------

    if (message.reply_to) {

        const reply =
            document.createElement(
                "div"
            );

        reply.className =
            "reply-preview";

        reply.textContent =
            "답장 메시지";


        contentWrapper.appendChild(
            reply
        );

    }


    // ----------------------------------------------
    // 메시지 Row
    // ----------------------------------------------

    const row =
        document.createElement(
            "div"
        );

    row.className =
        "message-row";


    // ----------------------------------------------
    // 말풍선
    // ----------------------------------------------

    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "message-bubble";

    bubble.textContent =
        message.content;


    row.appendChild(
        bubble
    );


    // ----------------------------------------------
    // 시간 / 수정
    // ----------------------------------------------

    const meta =
        document.createElement(
            "div"
        );

    meta.className =
        "message-meta";


    const time =
        document.createElement(
            "div"
        );

    time.className =
        "message-time";

    time.textContent =
        formatTime(
            message.created_at
        );


    meta.appendChild(
        time
    );


    if (message.edited) {

        const edited =
            document.createElement(
                "div"
            );

        edited.className =
            "edited";

        edited.textContent =
            "(수정됨)";


        meta.appendChild(
            edited
        );

    }


    row.appendChild(
        meta
    );


    contentWrapper.appendChild(
        row
    );


    // ----------------------------------------------
    // 액션 버튼
    // ----------------------------------------------

    const actions =
        document.createElement(
            "div"
        );

    actions.className =
        "message-actions";


    // 답장

    const replyButton =
        document.createElement(
            "button"
        );

    replyButton.type =
        "button";

    replyButton.className =
        "message-action";

    replyButton.textContent =
        "답장";


    replyButton.addEventListener(
        "click",
        () => {

            setReplyTarget(
                message
            );

        }
    );


    actions.appendChild(
        replyButton
    );


    // ----------------------------------------------
    // 본인 메시지
    // ----------------------------------------------

    if (isMine) {

        // 수정

        const editButton =
            document.createElement(
                "button"
            );

        editButton.type =
            "button";

        editButton.className =
            "message-action";

        editButton.textContent =
            "수정";


        editButton.addEventListener(
            "click",
            () => {

                editMessage(
                    message
                );

            }
        );


        // 삭제

        const deleteButton =
            document.createElement(
                "button"
            );

        deleteButton.type =
            "button";

        deleteButton.className =
            "message-action";

        deleteButton.textContent =
            "삭제";


        deleteButton.addEventListener(
            "click",
            () => {

                deleteMessage(
                    message
                );

            }
        );


        actions.appendChild(
            editButton
        );

        actions.appendChild(
            deleteButton
        );

    }


    contentWrapper.appendChild(
        actions
    );


    wrapper.appendChild(
        contentWrapper
    );


    messages.appendChild(
        wrapper
    );

}


// ======================================================
// 메시지 보내기
// ======================================================

messageForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!currentUser) {

            return;

        }


        const content =
            messageInput.value.trim();


        if (!content) {

            return;

        }


        sendButton.disabled = true;


        try {

            const {
                data,
                error
            } = await db
                .from("messages")
                .insert({
                    user_id:
                        currentUser.id,

                    content:
                        content,

                    reply_to:
                        replyTarget
                            ? replyTarget.id
                            : null
                })
                .select()
                .single();


            if (error) {

                console.error(
                    "메시지 전송 실패:",
                    error
                );

                alert(
                    "메시지 전송 실패:\n\n" +
                    error.message
                );

                return;

            }


            console.log(
                "메시지 전송 성공:",
                data
            );


            messageInput.value = "";

            cancelReply();

            resizeTextarea();


            // Realtime이 바로 들어오지 않는 경우를 대비
            await loadMessages();

        } catch (error) {

            console.error(
                "메시지 전송 오류:",
                error
            );

            alert(
                "메시지를 보내는 중 오류가 발생했습니다."
            );

        } finally {

            sendButton.disabled = false;

        }

    }
);


// ======================================================
// 메시지 수정
// ======================================================

async function editMessage(
    message
) {

    if (!currentUser) {

        return;

    }


    const newContent =
        prompt(
            "메시지를 수정하세요.",
            message.content
        );


    if (
        newContent === null
    ) {

        return;

    }


    const content =
        newContent.trim();


    if (!content) {

        alert(
            "메시지 내용을 입력해주세요."
        );

        return;

    }


    const {
        error
    } = await db
        .from("messages")
        .update({
            content:
                content,

            edited:
                true,

            edited_at:
                new Date().toISOString()
        })
        .eq(
            "id",
            message.id
        )
        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "메시지 수정 실패:",
            error
        );

        alert(
            "메시지를 수정하지 못했습니다.\n\n" +
            error.message
        );

        return;

    }


    await loadMessages();

}


// ======================================================
// 메시지 삭제
// ======================================================

async function deleteMessage(
    message
) {

    if (!currentUser) {

        return;

    }


    const confirmed =
        confirm(
            "이 메시지를 삭제할까요?"
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } = await db
        .from("messages")
        .delete()
        .eq(
            "id",
            message.id
        )
        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "메시지 삭제 실패:",
            error
        );

        alert(
            "메시지를 삭제하지 못했습니다.\n\n" +
            error.message
        );

        return;

    }


    await loadMessages();

}


// ======================================================
// 답장 시작
// ======================================================

function setReplyTarget(
    message
) {

    replyTarget =
        message;


    replyBar.classList.remove(
        "hidden"
    );


    const name =
        message.profiles?.display_name ||
        "사용자";


    replyText.textContent =
        `${name}: ${message.content}`;


    messageInput.focus();

}


// ======================================================
// 답장 취소
// ======================================================

function cancelReply() {

    replyTarget = null;


    replyBar.classList.add(
        "hidden"
    );


    replyText.textContent =
        "";

}


cancelReplyButton.addEventListener(
    "click",
    cancelReply
);


// ======================================================
// Realtime
// ======================================================

function setupRealtime() {

    leaveRealtime();


    realtimeChannel =
        db.channel(
            "class-chat-messages"
        );


    realtimeChannel
        .on(
            "postgres_changes",
            {
                event: "*",

                schema: "public",

                table: "messages"
            },
            async payload => {

                console.log(
                    "Realtime:",
                    payload
                );


                await loadMessages();

            }
        )
        .subscribe(
            status => {

                console.log(
                    "Realtime 상태:",
                    status
                );


                if (
                    status ===
                    "SUBSCRIBED"
                ) {

                    onlineText.textContent =
                        "실시간 연결됨";

                } else {

                    onlineText.textContent =
                        "실시간 연결 중...";

                }

            }
        );

}


// ======================================================
// Realtime 종료
// ======================================================

function leaveRealtime() {

    if (
        realtimeChannel
    ) {

        db.removeChannel(
            realtimeChannel
        );

        realtimeChannel =
            null;

    }

}


// ======================================================
// Presence
// ======================================================

function setupPresence() {

    leavePresence();


    if (!currentUser) {

        return;

    }


    presenceChannel =
        db.channel(
            "class-chat-presence"
        );


    presenceChannel
        .on(
            "presence",
            {
                event: "sync"
            },
            () => {

                const state =
                    presenceChannel.presenceState();


                const users =
                    Object.keys(
                        state
                    ).length;


                onlineText.textContent =
                    `온라인 ${users}명`;

            }
        )
        .subscribe(
            async status => {

                console.log(
                    "Presence:",
                    status
                );


                if (
                    status ===
                    "SUBSCRIBED"
                ) {

                    await presenceChannel.track({
                        user_id:
                            currentUser.id
                    });

                }

            }
        );

}


// ======================================================
// Presence 종료
// ======================================================

function leavePresence() {

    if (
        presenceChannel
    ) {

        db.removeChannel(
            presenceChannel
        );

        presenceChannel =
            null;

    }

}


// ======================================================
// 관리자 버튼
// ======================================================

adminButton.addEventListener(
    "click",
    async () => {

        if (
            !currentProfile?.is_admin
        ) {

            return;

        }


        adminPanel.classList.remove(
            "hidden"
        );


        await loadAdminUsers();

    }
);


// ======================================================
// 관리자 패널 닫기
// ======================================================

closeAdminButton.addEventListener(
    "click",
    () => {

        adminPanel.classList.add(
            "hidden"
        );

    }
);


// ======================================================
// 관리자 사용자 목록
// ======================================================

async function loadAdminUsers() {

    if (
        !currentProfile?.is_admin
    ) {

        return;

    }


    adminUsers.textContent =
        "불러오는 중...";


    const {
        data,
        error
    } = await db
        .from("account_info")
        .select(
            "username, user_id"
        )
        .order(
            "username",
            {
                ascending: true
            }
        );


    if (error) {

        console.error(
            "관리자 사용자 조회 실패:",
            error
        );


        adminUsers.textContent =
            "사용자 정보를 불러오지 못했습니다.\n\n" +
            error.message;


        return;

    }


    adminUsers.innerHTML =
        "";


    if (
        !data ||
        data.length === 0
    ) {

        adminUsers.textContent =
            "등록된 사용자가 없습니다.";

        return;

    }


    data.forEach(
        user => {

            const item =
                document.createElement(
                    "div"
                );


            item.style.padding =
                "12px 0";


            item.style.borderBottom =
                "1px solid #eee";


            item.innerHTML = `
                <strong>${escapeHTML(
                    user.username
                )}</strong>
            `;


            adminUsers.appendChild(
                item
            );

        }
    );

}


// ======================================================
// 로그아웃
// ======================================================

logoutButton.addEventListener(
    "click",
    async () => {

        logoutButton.disabled =
            true;


        const {
            error
        } = await db.auth.signOut();


        if (error) {

            console.error(
                "로그아웃 실패:",
                error
            );

            logoutButton.disabled =
                false;

            return;

        }


        leaveRealtime();

        leavePresence();


        logoutButton.disabled =
            false;

    }
);


// ======================================================
// 로그인 화면
// ======================================================

function showLogin() {

    loginScreen.classList.remove(
        "hidden"
    );

    chatScreen.classList.add(
        "hidden"
    );


    if (loginError) {

        loginError.textContent =
            "";

    }


    setTimeout(
        () => {

            if (emailInput) {

                emailInput.focus();

            }

        },
        50
    );

}


// ======================================================
// 시간 포맷
// ======================================================

function formatTime(
    timestamp
) {

    const date =
        new Date(
            timestamp
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleTimeString(
        "ko-KR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// ======================================================
// 스크롤
// ======================================================

function scrollToBottom() {

    requestAnimationFrame(
        () => {

            messages.scrollTop =
                messages.scrollHeight;

        }
    );

}


// ======================================================
// Textarea 자동 크기
// ======================================================

function resizeTextarea() {

    messageInput.style.height =
        "auto";


    const height =
        Math.min(
            messageInput.scrollHeight,
            130
        );


    messageInput.style.height =
        height + "px";

}


messageInput.addEventListener(
    "input",
    resizeTextarea
);


// ======================================================
// Enter 전송
//
// Enter       → 전송
// Shift+Enter → 줄바꿈
// ======================================================

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();


            if (
                !sendButton.disabled
            ) {

                messageForm.requestSubmit();

            }

        }

    }
);


// ======================================================
// HTML escape
//
// 관리자 패널 등에서 사용자 입력을
// HTML로 직접 넣을 때 XSS 방지
// ======================================================

function escapeHTML(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}
