import { Box, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useRouteLoaderData } from 'react-router-dom'
import DefaultButton from '../../../../components/DefaultButton'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import api from '../../../../services/api'
import { useUserDataStore } from '../../../../store/useUserData'
import { UserLoaderDataType } from '../../../../types/types'
import { getAuthToken } from '../../../../util/auth'

type CardNotificacoesProps = {
    notificationsCount: number
}

const CardNotificações = ({ notificationsCount }: CardNotificacoesProps) => {
    return (
        <Box>
            <DefaultTitle>Suas Notificações</DefaultTitle>
            <DefaultCard
                width={{
                    xs: 'calc(100vw - 2rem)',
                    md: '300px',
                    lg: '100%',
                }}
            >
                <Typography fontWeight="medium" color="grey.500">
                    Notificações
                </Typography>
                <Divider />
                <Typography marginTop="5px">Você possui</Typography>
                <Typography
                    color="primary.main"
                    fontWeight="bold"
                    fontSize="50px"
                >
                    {notificationsCount}
                </Typography>
                <Typography>
                    solicitações de agendamento de férias pendentes
                </Typography>
                <Link
                    to={'/home/gestor/solicitacoes'}
                    style={{ textDecoration: 'none' }}
                >
                    <DefaultButton
                        small={true}
                        content={'Ir para solicitações'}
                    />
                </Link>
            </DefaultCard>
        </Box>
    )
}

export default CardNotificações
