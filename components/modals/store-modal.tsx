"use client";

import * as z from "zod"

import { Modal } from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios"
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const [ loading, setloading ] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:""
        }
    })

    const onSubmit =async (values:z.infer<typeof formSchema>) => {
        try {
            setloading(true)

            const response = await axios.post('/api/stores', values)
            window.location.assign(`/${response.data.id}`)

        } catch (error) {
            toast.error("Something went Wrong")
        } finally {
            setloading(false)
        }
    }

    return(
    <Modal title="Create Store" description="Create New Store"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
            <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormItem>
                                            <FormLabel>Name:</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Craft Works" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormItem>
                                )} />
                            <div className="pt-6 space-x-2 flex items-end justify-end w-full">
                                <Button disabled= {loading} type="submit">Create</Button>
                                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                            </div>
                     </form>
                </Form>
                </div>
            </div>
            
        </Modal>
    )
}

function ZodResolver(formSchema: z.ZodObject<{ name: z.ZodString; }, "strip", z.ZodTypeAny, { name: string; }, { name: string; }>): import("react-hook-form").Resolver<{ name: string; }, any> | undefined {
    throw new Error("Function not implemented.");
}