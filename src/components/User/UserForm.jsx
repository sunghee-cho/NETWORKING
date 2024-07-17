import React from 'react'

const UserForm = ({ userInfo, updateUser, deleteUser }) => {

    const onUpdate = (e) => {
        e.preventDefault()

        const form = e.target
        const userId = form.username.value      // 아이디
        const userPw = form.password.value      // 비밀번호
        const name = form.name.value            // 이름
        const email = form.email.value          // 이메일
        const area = form.area.value            // 지역
        const status = form.status.value        // 구직여부
        const industry = form.industry.value    // 직무분야
        const edu = form.edu.value              // 학력
        const skill = form.skill.value          // 스킬
        const cert = form.cert.value            // 자격증
        const bio = form.bio.value              // 경력사항
        const company = form.company.value      // 소속
        const title = form.title.value          // 직급

        console.log(userId, userPw, name, email, area, status, industry, edu, skill, cert, bio, company, title);

        updateUser( {userId, userPw, name, email, area, status, industry, edu, skill, cert, bio, company, title } )
    }

    return (
        <div className="form">
            <h2 className="login-title">내 정보</h2>

            <form className='login-form' onSubmit={ (e) => onUpdate(e) }>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input type="text"
                            id='username'
                            name='username'
                            required
                            readOnly
                            defaultValue={ userInfo?.userId }
                    />
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password"
                            id='password'
                            name='password'
                            required
                    />
                </div>

                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text"
                            id='name'
                            name='name'
                            required
                            defaultValue={ userInfo?.name }
                    />
                </div>

                <div>
                    <label htmlFor="email">이메일</label>
                    <input type="text"
                            id='email'
                            name='email'
                            required
                            defaultValue={ userInfo?.email }
                    />
                </div>

                <div>
                <label htmlFor="area">지역</label>
                <input type="text"
                        id='area'
                        name='area'
                        defaultValue={ userInfo?.area }
                />
            </div>

            <div>
                <label htmlFor="status">구직여부</label>
                <input type="text"
                        id='status'
                        name='status'
                        defaultValue={ userInfo?.status }
                />
            </div>

            <div>
                <label htmlFor="industry">직무분야</label>
                <input type="text"
                        id='industry'
                        name='industry'
                        defaultValue={ userInfo?.industry }
                />
            </div>

            <div>
                <label htmlFor="edu">학력</label>
                <input type="text"
                        id='edu'
                        name='edu'
                        defaultValue={ userInfo?.edu }
                />
            </div>

            <div>
                <label htmlFor="skill">스킬</label>
                <input type="text"
                        id='skill'
                        name='skill'
                        defaultValue={ userInfo?.skill }
                />
            </div>

            <div>
                <label htmlFor="cert">자격증</label>
                <input type="text"
                        id='cert'
                        name='cert'
                        defaultValue={ userInfo?.cert }
                />
            </div>

            <div>
                <label htmlFor="bio">경력사항</label>
                <input type="text"
                        id='bio'
                        name='bio'
                        defaultValue={ userInfo?.bio }
                />
            </div>

            <div>
                <label htmlFor="company">소속</label>
                <input type="text"
                        id='company'
                        name='company'
                        defaultValue={ userInfo?.company }
                />
            </div>

            <div>
                <label htmlFor="title">직급</label>
                <input type="text"
                        id='title'
                        name='title'
                        defaultValue={ userInfo?.title }
                />
            </div>

                <button type='submit' className='btn btn--form btn-login'>
                    정보 수정     
                </button>
                <button type='button' className='btn btn--form btn-login'
                        onClick={ () => deleteUser(userInfo.userId)} >
                    회원 탈퇴
                </button>
            </form>
        </div>
    )
}

export default UserForm