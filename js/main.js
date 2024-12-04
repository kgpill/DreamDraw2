document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profileIcon");
    const profileMenu = document.getElementById("profileMenu");
    const loginButton = document.getElementById("loginButton");
    const signInButton = document.getElementById("signInButton");
    const logoutButton = document.getElementById("logoutButton");
    const userNameDisplay = document.getElementById("userNameDisplay");
    const authMenu = document.getElementById("authMenu");
    const userMenu = document.getElementById("userMenu");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const popupCloseButton = document.getElementById("popupCloseButton");
    const navLinks = document.querySelectorAll(".nav-link");

    let loggedInUser = null; // 사용자 상태 관리

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
    }

    function closePopup() {
        popup.classList.add("hidden");
    }

      // 왼쪽 메뉴 버튼 클릭 시
  menuButton.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
  });

    // 쿠키에서 userName 값 읽기
    function getCookieValue(cookieName) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === cookieName) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    // 오른쪽 프로필 메뉴 클릭 시
    profileIcon.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");

        const authMenu = document.getElementById("authMenu");
        const userMenu = document.getElementById("userMenu");
        const userNameDisplay = document.getElementById("userNameDisplay");

        const userName = getCookieValue("userName");

        if (userName === null) {
            authMenu.classList.remove("hidden");
            userMenu.classList.add("hidden");
        } else {
            authMenu.classList.add("hidden");
            userMenu.classList.remove("hidden");
            userNameDisplay.textContent = `어서오세요, ${userName}님!`;
        }
    });

     // 회원가입
signInButton.addEventListener("click", async () => {
    // Step 1: Prompt for User ID
    const { value: userId } = await Swal.fire({
        title: '아이디 입력',
        input: 'text',
        inputLabel: '아이디를 입력하세요:',
        inputPlaceholder: '아이디',
        showCancelButton: true,
        confirmButtonText: '다음',
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '아이디를 입력해야 합니다!';
            }
        },
        didOpen: () => {
            // 입력칸에 스타일 직접 적용
            const inputElement = Swal.getInput(); // SweetAlert2 입력 요소 가져오기
            if (inputElement) {
                inputElement.style.textAlign = 'center'; // 텍스트 중앙 정렬
                inputElement.style.margin = '0 auto';   // 입력칸 중앙 배치
                inputElement.style.width = '80%';       // 입력칸 너비 조정
                inputElement.style.padding = '10px';    // 입력칸 내부 여백
                inputElement.style.fontSize = '16px';   // 입력 텍스트 크기
            }
        }
    });
    

    if (!userId) return; // User cancelled the prompt

    // Step 2: Prompt for Password
    const { value: password } = await Swal.fire({
        title: '비밀번호 입력',
        input: 'password',
        inputLabel: '비밀번호를 입력하세요:',
        inputPlaceholder: '비밀번호',
        showCancelButton: true,
        confirmButtonText: '다음',
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '비밀번호를 입력해야 합니다!';
            }
        },
        didOpen: () => {
            // 입력칸에 스타일 직접 적용
            const inputElement = Swal.getInput(); // SweetAlert2 입력 요소 가져오기
            if (inputElement) {
                inputElement.style.textAlign = 'center'; // 텍스트 중앙 정렬
                inputElement.style.margin = '0 auto';   // 입력칸 중앙 배치
                inputElement.style.width = '80%';       // 입력칸 너비 조정
                inputElement.style.padding = '10px';    // 입력칸 내부 여백
                inputElement.style.fontSize = '16px';   // 입력 텍스트 크기
            }
        }
        
    });

    if (!password) return; // User cancelled the prompt

    // Step 3: Prompt for User Name
    const { value: userName } = await Swal.fire({
        title: '닉네임 입력',
        input: 'text',
        inputLabel: '닉네임을 입력하세요:',
        inputPlaceholder: '닉네임',
        showCancelButton: true,
        confirmButtonText: '완료',
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '닉네임을 입력해야 합니다!';
            }
        },
        didOpen: () => {
            // 입력칸에 스타일 직접 적용
            const inputElement = Swal.getInput(); // SweetAlert2 입력 요소 가져오기
            if (inputElement) {
                inputElement.style.textAlign = 'center'; // 텍스트 중앙 정렬
                inputElement.style.margin = '0 auto';   // 입력칸 중앙 배치
                inputElement.style.width = '80%';       // 입력칸 너비 조정
                inputElement.style.padding = '10px';    // 입력칸 내부 여백
                inputElement.style.fontSize = '16px';   // 입력 텍스트 크기
            }
        }
    });

    if (!userName) return; // User cancelled the prompt

    // If all inputs are provided
    console.log('User Details:', { userId, password, userName });
    Swal.fire({
        icon: 'success',
        title: '입력 완료',
        text: `아이디: ${userId}, 닉네임: ${userName}`,
        confirmButtonText: '확인'
    });

  
    if (userId && password && userName) {
        const payload = { userId, password, userName };
        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
  
            const data = await response.json();
            if (response.ok) {
                console.log("회원가입 성공:", data.success);
                // SweetAlert2로 성공 팝업 띄우기
                Swal.fire({
                  icon: 'success',
                  title: '회원가입 성공',
                  text: data.success,
                  confirmButtonText: '확인',
                  customClass: {
                      popup: 'swal-custom-popup'
                  }
              });
            } else {
                console.error("회원가입 실패:", data.error);
                // SweetAlert2로 성공 팝업 띄우기
                Swal.fire({
                  icon: 'error',
                  title: '회원가입 실패',
                  text: data.error,
                  confirmButtonText: '확인',
                  customClass: {
                      popup: 'swal-custom-popup'
                  }
              });
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
        }
    } else {
        console.error("모든 필드를 입력해주세요.");
    }
  });
  
  // 로그인
  loginButton.addEventListener("click", async () => {
    // Step 1: Prompt for User ID
    const { value: userId } = await Swal.fire({
        title: '아이디 입력',
        input: 'text',
        inputLabel: '아이디를 입력하세요:',
        inputPlaceholder: '아이디',
        showCancelButton: true,
        confirmButtonText: '다음',
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '아이디를 입력해야 합니다!';
            }
        },
        didOpen: () => {
            // 입력칸에 스타일 직접 적용
            const inputElement = Swal.getInput(); // SweetAlert2 입력 요소 가져오기
            if (inputElement) {
                inputElement.style.textAlign = 'center'; // 텍스트 중앙 정렬
                inputElement.style.margin = '0 auto';   // 입력칸 중앙 배치
                inputElement.style.width = '80%';       // 입력칸 너비 조정
                inputElement.style.padding = '10px';    // 입력칸 내부 여백
                inputElement.style.fontSize = '16px';   // 입력 텍스트 크기
            }
        }
    });

    if (!userId) return; // User cancelled the prompt

    // Step 2: Prompt for Password
    const { value: password } = await Swal.fire({
        title: '비밀번호 입력',
        input: 'password',
        inputLabel: '비밀번호를 입력하세요:',
        inputPlaceholder: '비밀번호',
        showCancelButton: true,
        confirmButtonText: '다음',
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '비밀번호를 입력해야 합니다!';
            }
        },
        didOpen: () => {
            // 입력칸에 스타일 직접 적용
            const inputElement = Swal.getInput(); // SweetAlert2 입력 요소 가져오기
            if (inputElement) {
                inputElement.style.textAlign = 'center'; // 텍스트 중앙 정렬
                inputElement.style.margin = '0 auto';   // 입력칸 중앙 배치
                inputElement.style.width = '80%';       // 입력칸 너비 조정
                inputElement.style.padding = '10px';    // 입력칸 내부 여백
                inputElement.style.fontSize = '16px';   // 입력 텍스트 크기
            }
        }
    });

    if (!password) return; // User cancelled the prompt
  
    if (userId && password) {
        const payload = { userId, password };
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
  
            const data = await response.json();
            if (response.ok) {
                console.log("로그인 성공:", data.success);
                // SweetAlert2로 성공 팝업 띄우기
                Swal.fire({
                  icon: 'success',
                  title: '로그인 성공',
                  text: data.success,
                  confirmButtonText: '확인',
                  customClass: {
                      popup: 'swal-custom-popup'
                  }
              });
  
                // 프로필 메뉴 업데이트
                profileMenu.classList.remove("hidden");
                const userName = getCookieValue("userName");
                const userMenu = document.getElementById("userMenu");
                const authMenu = document.getElementById("authMenu");
                const userNameDisplay = document.getElementById("userNameDisplay");
  
                if (userName) {
                    authMenu.classList.add("hidden");
                    userMenu.classList.remove("hidden");
                    userNameDisplay.textContent = `어서오세요, ${userName}님!`;
                }
            } else {
                console.error("로그인 실패:", data.error);
                // SweetAlert2로 에러 팝업 띄우기
                Swal.fire({
                  icon: 'error',
                  title: '로그인 실패',
                  text: data.error,
                  confirmButtonText: '확인',
                  customClass: {
                      popup: 'swal-custom-popup'
                  }
              });
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    } else {
        console.error("아이디와 비밀번호를 입력해주세요.");
    }
  });
  
  // 로그아웃
  logoutButton.addEventListener("click", async () => {
    try {
        const response = await fetch('/logout', {
            method: 'POST'
        });
  
        if (response.redirected) {
            // SweetAlert2로 성공 팝업 띄우기
            Swal.fire({
                icon: 'warning',
                title: '로그아웃',
                text: '홈으로 돌아갑니다.',
                confirmButtonText: '확인',
                customClass: {
                    popup: 'swal-custom-popup'
                }
            }).then((result) => {
                // 확인 버튼을 눌렀을 때만 실행
                if (result.isConfirmed) {
                    window.location.href = response.url; // 성공 시 index.html로 이동
                }
            });
        } else {
            // SweetAlert2로 애러 팝업 띄우기
            Swal.fire({
              icon: 'error',
              title: '로그아웃 실패',
              text: data.error,
              confirmButtonText: '?',
              customClass: {
                  popup: 'swal-custom-popup'
              }
          });
        }
    } catch (error) {
        console.error("Error during logout:", error);
        // SweetAlert2로 에러 팝업 띄우기
        Swal.fire({
          icon: 'error',
          title: '로그아웃 중 문제 발생',
          text: '?',
          confirmButtonText: '확인',
          customClass: {
              popup: 'swal-custom-popup'
          }
      });
    }
  });


    // 네비게이션 제한
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const userName = getCookieValue("userName"); // 쿠키에서 userName 확인
            if (link.dataset.requiresLogin === "true" && !userName) {
                e.preventDefault(); // 링크 이동 방지
                showPopup("로그인이 필요합니다."); // 팝업 표시
            }
        });
    });

    // UI 업데이트
    function updateUI() {
        if (loggedInUser) {
            authMenu.classList.add("hidden");
            userMenu.classList.remove("hidden");
            userNameDisplay.textContent = `안녕하세요, ${loggedInUser.username}`;
        } else {
            authMenu.classList.remove("hidden");
            userMenu.classList.add("hidden");
        }
    }

    // 팝업 닫기
    popupCloseButton.addEventListener("click", closePopup);

    // 초기 UI 설정
    updateUI();
});
