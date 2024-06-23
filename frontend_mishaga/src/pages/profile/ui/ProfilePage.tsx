import React from "react"
import { Button } from "shared/ui"
import examplePhoto from 'assets/examplePhoto.jpeg'
import { useAppDispatch, useAppSelector } from "shared/api/hooks";
import { CreateUser, UpdateUser, fetchUpdateUser, fetchUpdateUserImage } from "entities/user/model/userSlice";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

interface UserForm extends UpdateUser {
    repeatPassword: string
}

interface ProfileInputProps {
    id: keyof Inputs;
    text: string;
    type?: string;
    defaultValue?: string | number;
    register: UseFormRegister<Inputs>;
}

interface RequestFieldProps {
    first: string
    second: string
    third: string
    border?: boolean
    key: number
    status?: string
}

interface Inputs {
    fio: string
    password: string
    repeatPassword: string
    email: string
    community: string
    room: number
}

const ProfileInput: React.FC<ProfileInputProps> = ({ id, text, type, register, defaultValue}) => {
    const profileInputClass = 'flex flex-col w-full p-2'
    const borderClass = 'border rounded-lg border-solid border-semiLightGray px-3'
    return (
        <div className={profileInputClass}>
            <label htmlFor={id}>{text}</label>
            <input autoComplete="new-password" defaultValue={defaultValue} {...register(id)} className={`mt-2 h-8 ${borderClass}`} id={id} type={type || "text"} />
        </div>
    )
}

// const RequestField: React.FC<RequestFieldProps> = ({ first, second, third, border, key, status }) => {
//     const borderClass = 'border rounded-lg border-solid border-semiLightGray mt-4'
//     return (
//         <div className={`h-16 items-center flex flex-row ${border && borderClass}`} key={key}>
//             <p className="w-2/5 pl-6">{first}</p>
//             <p className="w-3/10 text-center">{second}</p>
//             <p className="w-3/10 text-center">
//                 { status ?
//                 <span 
//                     className={`px-2 py-0.5 text-center border border-solid ${ status === 'complete' ? 'border-green text-green' : 'border-red text-red'}`}
//                 >
//                     {third}
//                 </span>
//                 : third
//                 }
//             </p>
//         </div>
//     )
// }

export const ProfilePage = () => {
    // const { user, photo } = profileRoute.useLoaderData()
    const user = useAppSelector(state => state.user.entities)
    const dispatch = useAppDispatch()
    // const tableData = [
    //     {
    //         email: 'a@sfa.c',
    //         date: '03/11/2005',
    //         status: 'complete'
    //     },
    //     {
    //         email: 'b@bbb.c',
    //         date: '04/11/2005',
    //         status: 'pending'
    //     }
    // ]

    const handlePhoto = async (file: React.ChangeEvent<HTMLInputElement>) => {
        if (!file.target.files?.length || file.target.files[0].size > 1000000) return
        try {
            const formData = new FormData();
            formData.append( "file", file.target.files[0], file.target.files[0].name);
            dispatch(fetchUpdateUserImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    const {
        register,
        handleSubmit,
      } = useForm<Inputs>()

    if (!user) return

    const onSubmit: SubmitHandler<Inputs> = (data: UserForm) => {
        if (data.password !== data.repeatPassword) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedUser: Partial<UserForm> = Object.fromEntries(Object.entries(data).filter(([_, value]) => value))
        delete updatedUser.repeatPassword
        if (updatedUser.room) updatedUser.room = +updatedUser.room
        let passed = false
        for (const key in updatedUser) {
            if (key in updatedUser)
            if (updatedUser[key as keyof CreateUser] !== user[key as keyof CreateUser]) 
            passed = true
        }
        if (!passed) return
        dispatch(fetchUpdateUser(updatedUser))
    }

    return (
        <div className="w-full h-full">
            <h1 className="">Профиль</h1>
            <div className="flex flex-col sm:flex-row w-full mt-12 justify-between">
                <div className="m-auto w-64 flex flex-col justify-between">
                    <img draggable="false" src={user.profileImage ? `http://localhost:3000/api/users/photo:${user.profileImage}` : examplePhoto} alt="you" width={256} height={256} className="w-64 h-64 mb-2 object-cover text-center"/>
                    <label className="flex flex-col relative">
                        <input 
                            accept=".jpg, .png, .jpeg"
                            className="z-20 absolute w-full h-full opacity-0 cursor-pointer" 
                            type="file" 
                            name="avatar" 
                            id="avatar"
                            onChange={handlePhoto} 
                        />
                        <Button text={"Загрузить автар"}/>
                    </label>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full sm:w-profile-form mt-4 sm:mt-0 sm:ml-6 justify-between">
                    <div className="flex flex-row h-max text-left">
                        <div className="flex flex-col w-6/12">
                            <input autoComplete="false" name="hidden" type="text" style={{display: 'none'}}/>
                            <ProfileInput defaultValue={user.fio} register={register} id={"fio"} text={"ФИО"} />
                            <ProfileInput register={register} id={"password"} text={"Пароль"} type={"password"}/>
                            <ProfileInput register={register} id={"repeatPassword"} text={"Подтвердить пароль"} type={"password"}/>
                        </div>
                        <div className="flex flex-col h-max w-6/12">
                            <ProfileInput defaultValue={user.email} register={register} id={"email"} text={"Почта"} />
                            <ProfileInput defaultValue={user.community} register={register} id={"community"} text={"Общежитие"} />
                            <ProfileInput defaultValue={user.room || ''} register={register} id={"room"} text={"Номер комнаты"} type="number"/>
                        </div>
                    </div>
                    <div className="w-full mt-2 sm:mt-0 sm:w-6/12 self-end flex flex-col px-2">
                        <Button submit text="Сохранить" />
                    </div>
                </form>
            </div>
            {/* <div className="w-3/5 m-auto flex flex-col justify-center mt-10">
                <h2>Приглашения</h2>
                <div className="px-6 mt-6">
                    <input className={`h-11 mr-1 w-3/5 bg-lightGray px-3`} type="email" placeholder="Введите email" />
                    <Button text="Отправить" />
                </div>
                <div className="flex flex-col mt-8 text-left" >
                    <RequestField first={"Email"} second={"Дата отправки"} third={"Статус"} key={0} />
                    {tableData.map((tableEl, index) => 
                        <RequestField 
                            first={tableEl.email} 
                            second={tableEl.date} 
                            third={tableEl.status} 
                            key={index} 
                            status={tableEl.status} 
                            border
                        />
                    )}
                </div>
            </div> */}
        </div>
    )
}