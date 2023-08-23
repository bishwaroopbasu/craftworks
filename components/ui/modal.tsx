"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "./dialog";


interface ModelProps {
    title: String;
    description: String;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;

}

export const Modal: React.FC<ModelProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{ description }</DialogDescription>
                </DialogHeader>
                <div>
                    { children }
                </div>
            </DialogContent>
        </Dialog>
    )
}