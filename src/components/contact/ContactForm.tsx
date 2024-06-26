import { CreateContactDto } from "@/types"
import { doPost } from "@/utils"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import React, { useCallback, type FC } from "react"
import { Button, Trans } from "../common"
import { MdArrowForward } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { modals } from "@mantine/modals"

interface ContactFromProps {
    showContent?: boolean
    submitFunction?: () => void
    className?: string
}

const ContactForm: FC<ContactFromProps> = ({
    showContent = true,
    submitFunction = () => { },
    className = "",
}) => {
    const form = useForm({
        initialValues: {
            name: "",
            customerType: "cá nhân",
            phone: "",
            company: "",
            email: "",
            content: "",
        },
        validate: {
            customerType: (v) => v != null ? null : "Vui lòng chọn bạn là gì",
            name: (value) =>
                value.trim().length > 0 ? null : "Vui lòng nhập tên",
            phone: (value) =>
                value.trim().length > 0 ? null : "Vui lòng nhập số điện thoại",
            company: (value) =>
                value.trim().length > 0 ? null : "Vui lòng nhập tên công ty",
            email: (value) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : "Vui lòng nhập đúng định dạng email",
        },
    })

    const handleSubmit = useCallback(async () => {
        form.validate()

        if (!form.isValid()) {
            notifications.show({
                title: "Không thể gửi tin nhắn",
                message: Object.values(form.errors)[0],
                color: "red",
            })
            return
        }

        const { data, error } = await doPost<CreateContactDto>(
            "/contacts",
            form.values
        )
        if (error) {
            notifications.show({
                title: "Không thể gửi tin nhắn",
                message: "Vui lòng thử lại sau",
                color: "red",
            })
        } else {
            notifications.show({
                title: "Gửi tin nhắn thành công",
                message: "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể",
                color: "green",
            })
            submitFunction()
            form.reset()
            modals.closeAll()
        }
    }, [form, notifications, doPost, submitFunction, modals])

    return (
        <div
            className={twMerge(
                ` grid grid-cols-2 gap-x-16 gap-y-8 w-full max-w-3xl m-auto ${className}`
            )}
        >
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label htmlFor="isPersonal" className="font-medium">
                    <Trans text="contact.form.userType.label" />
                </label>
                <select
                    title="customerType"
                    id="customerType"
                    name="customerType"
                    className="border-b border-tertiary outline-none pb-1"
                    {...form.getInputProps("customerType")}
                >
                    <option value="cá nhân"><Trans text="contact.form.userType.options.personal" /></option>
                    <option value="phòng khám đa khoa"><Trans text="contact.form.userType.options.multispecialtyClinic" /></option>
                    <option value="phòng khám chuyên khoa"><Trans text="contact.form.userType.options.specialtyClinic" /></option>
                    <option value="bệnh viện"><Trans text="contact.form.userType.options.hospital" /></option>
                    <option value="khác"><Trans text="contact.form.userType.options.other" /></option>
                </select>
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label htmlFor="" className="font-medium">
                    <Trans text="contact.form.name" />
                </label>
                <input
                    type="text"
                    className="border-b border-tertiary outline-none pb-1"
                    {...form.getInputProps("name")}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label htmlFor="" className="font-medium">
                    <Trans text="contact.form.phone" />
                </label>
                <input
                    type="text"
                    className="border-b border-tertiary outline-none pb-1"
                    {...form.getInputProps("phone")}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label htmlFor="" className="font-medium">
                    <Trans text="contact.form.company" />
                </label>
                <input
                    type="text"
                    className="border-b border-tertiary outline-none pb-1"
                    {...form.getInputProps("company")}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label htmlFor="" className="font-medium">
                    <Trans text="contact.form.email" />
                </label>
                <input
                    type="text"
                    className="border-b border-tertiary outline-none pb-1"
                    {...form.getInputProps("email")}
                />
            </div>
            {showContent && (
                <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="" className="font-medium">
                        <Trans text="contact.form.message" />
                    </label>
                    <textarea
                        className="bg-tertiary-light/10 rounded-md outline-none p-6 h-60"
                        {...form.getInputProps("content")}
                    ></textarea>
                </div>
            )}
            <Button
                className="col-span-2 font-bold"
                variant="outline"
                onClick={handleSubmit}
            >
                <Trans text="contact.form.send" /> <MdArrowForward />
            </Button>
        </div>
    )
}

export default ContactForm
