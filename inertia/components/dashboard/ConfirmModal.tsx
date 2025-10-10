import Button from './Button';

export default function ConfirmModal({ title, subtitle, onConfirm, onCancel, isShow = false }) {
    if (!isShow) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <div className="bg-background text-foreground w-96 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm">{subtitle}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onCancel} label="Cancel" />
                    <Button variant="destructive" onClick={onConfirm} label="Confirm" />
                </div>
            </div>
        </div>
    );
}
