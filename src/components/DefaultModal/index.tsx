import { Modal, Box } from '@mui/material'
import CustomButton from '../CustomButton'

type DefaultModalProps = {
    isOpen: boolean
    closeModal: () => void
    handleApproval: () => void
    approveText: string
    rejectText: string
    children: React.ReactNode
}

const DefaultModal = ({
    children,
    isOpen,
    closeModal,
    approveText,
    rejectText,
    handleApproval,
    ...props
}: DefaultModalProps) => {
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            {...props}
        >
            <Box
                sx={{
                    width: '90%',
                    maxWidth: '370px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '10px',
                    pt: 2,
                    px: 4,
                    pb: 3,
                }}
            >
                {children}
                <Box display="flex" justifyContent="center" gap="1rem">
                    <CustomButton
                        type="approve"
                        variant="contained"
                        startIcon={true}
                        onClick={handleApproval}
                    >
                        {approveText}
                    </CustomButton>
                    <CustomButton
                        type="reject"
                        variant="outlined"
                        startIcon={true}
                        onClick={closeModal}
                    >
                        {rejectText}
                    </CustomButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default DefaultModal
