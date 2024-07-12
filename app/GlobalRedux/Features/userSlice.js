import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


if (typeof localStorage !== "undefined") {
    var access = localStorage.getItem('access')
    var refresh = localStorage.getItem('refresh');
}

const axiosInstance = axios.create({
    baseURL: 'https://server.4xexchange.com/api/v1/',
    timeout: 5000,
    headers: {

        Authorization: access
            ? 'JWT ' + access
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if ((error.response.status === 401 && error.response.statusText === 'Unauthorized') || (error.response.status === 403 && error.response.statusText === 'Forbidden')) {
            const refreshToken = refresh

            if (refreshToken && refreshToken !== "undefined") {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('/jwt/refresh/', { refresh: refreshToken })
                        .then((response) => {

                            if (typeof localStorage !== "undefined") {

                                localStorage.setItem('access', response.data.access);
                                localStorage.setItem('refresh', response.data.refresh);
                            }

                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'JWT ' + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    logout()
                    window.location.href = '/Login';
                }
            } else {
                logout()
                window.location.href = '/Login';
            }
        }

        return Promise.reject(error);
    }
);



export const EmailCode = createAsyncThunk("user/EmailCode", async ({ email }) => {

    const body = { email };
    const response = await axiosInstance.post(`admin/emailCode/`, body);
    return response.data;

});

export const signUp = createAsyncThunk("user/signUp", async ({ code, email, username, password }) => {

    const body = { code, email, username, password };
    const response = await axiosInstance.post(`admin/sign-up/`, body);
    return response.data;

});

export const getUser = createAsyncThunk('users/me', async () => {

    const headers = {
        'Authorization': 'JWT ' + localStorage.getItem('access'),
        'Content-Type': 'application/json',
    }

    const res = await axios.get('https://server.4xexchange.com/api/v1/users/me/', { headers });

    return res.data;
});

export const login = createAsyncThunk("user/login", async ({ email, password }) => {
    const body = { email, password };
    const response = await axiosInstance.post(`/jwt/create/`, body);

    return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    return null;
});

export const resetPassword = createAsyncThunk("user/resetPassword", async ({ new_password, re_new_password, current_password }) => {
    const body = { new_password, re_new_password, current_password };
    const response = await axiosInstance.post(`/users/set_password/`, body);
    return response.data;
});

export const createTicket = createAsyncThunk("user/createTicket", async ({ title, description }) => {
    const body = { title, description };
    const response = await axiosInstance.post(`/tickets/create/`, body);
    return response.data;
});

export const allTickets = createAsyncThunk("user/allTickets", async () => {
    const headers = {
        'Authorization': 'JWT ' + localStorage.getItem('access'),
        'Content-Type': 'application/json',
    }
    const response = await axios.get(`https://server.4xexchange.com/api/v1/tickets/all/`, { headers });
    return response.data;
});

export const AdminUserList = createAsyncThunk("user/AdminUserList", async () => {
    const response = await axiosInstance.get(`/admin/userList/`);
    return response.data;
});

export const AdminTicketList = createAsyncThunk("user/AdminTicketList", async ({ type }) => {
    const body = { type };
    const response = await axiosInstance.post(`tickets/admin/ticketList/`, body);
    return response.data;
});

export const AdminTicketAnswer = createAsyncThunk("user/AdminTicketAnswer", async ({ ticket, userType, message }) => {
    const body = { ticket, userType, message };
    const response = await axiosInstance.post(`tickets/admin/ticketAnswer/`, body);
    return response.data;
});

export const ClientTicketAnswer = createAsyncThunk("user/ClientTicketAnswer", async ({ ticket, userType, message }) => {
    const body = { ticket, userType, message };
    const response = await axiosInstance.post(`tickets/ticketAnswer/`, body);
    return response.data;
});

export const AdminTicketComplete = createAsyncThunk("user/AdminTicketComplete", async ({ id }) => {
    const body = { id };
    const response = await axiosInstance.post(`tickets/admin/ticketComplete/`, body);
    return response.data;
});

export const AdminUserSearch = createAsyncThunk("user/AdminUserSearch", async ({ search }) => {
    const body = { search };
    const response = await axiosInstance.post(`admin/userSearch/`, body);
    return response.data;
});

export const ChartData = createAsyncThunk("user/ChartData", async () => {
    const response = await axiosInstance.get(`chart/data/`);
    return response.data;
});

export const DepositCreate = createAsyncThunk("user/DepositCreate", async ({ tether, wallet, crypto_type }) => {
    const body = { tether, wallet, crypto_type };
    const response = await axiosInstance.post(`payments/create/`, body);
    return response.data;
});

export const DepositRequests = createAsyncThunk("user/DepositRequests", async () => {
    const response = await axiosInstance.get(`payments/request/`);
    return response.data;
});

export const DepositCheck = createAsyncThunk("user/DepositCheck", async ({ tether }) => {
    const body = { tether };
    const response = await axiosInstance.post(`payments/check/`, body);
    return response.data;
});

export const DepositHistoryClient = createAsyncThunk("user/DepositHistoryClient", async () => {
    const response = await axiosInstance.get(`payments/history/client/`);
    return response.data;
});

export const temporaryChartData = createAsyncThunk("user/temporaryChartData", async () => {
    const response = await axiosInstance.get(`chart/change/`);
    return response.data;
});

export const AddPriceData = createAsyncThunk("user/AddPriceData", async ({ number, run_at }) => {
    const body = { number, run_at };
    const response = await axiosInstance.post(`chart/change/`, body);
    return response.data;
});

export const UserFullDetails = createAsyncThunk("user/UserFullDetails", async ({ id }) => {
    const body = { id };
    const response = await axiosInstance.post(`admin/userFullDetails/`, body);
    return response.data;
});

export const changeStatusUser = createAsyncThunk("user/changeStatusUser", async ({ id, status }) => {
    const body = { id, status };
    const response = await axiosInstance.post(`admin/changeStatusUser/`, body);
    return response.data;
});

export const allDepositUsers = createAsyncThunk("user/allDepositUsers", async () => {
    const response = await axiosInstance.get(`payments/all/`);
    return response.data;
});

export const withdrawEmail = createAsyncThunk("user/withdrawEmail", async ({ withdraw, wallet }) => {
    const body = { withdraw, wallet }
    const response = await axiosInstance.post(`payments/withdrawEmail/`, body);
    return response.data;
});

export const withdrawEmailConfirmation = createAsyncThunk("user/withdrawEmailConfirmation", async ({ code }) => {
    const body = { code }
    const response = await axiosInstance.post(`payments/withdrawEmailConfirmation/`, body);
    return response.data;
});

export const AdminWithdraws = createAsyncThunk("user/AdminWithdraws", async ({ type }) => {
    const body = { type };
    const response = await axiosInstance.post(`payments/withdrawsList/`, body);
    return response.data;
});

export const changeWithdrawAnswer = createAsyncThunk("user/changeWithdrawAnswer", async ({ answer, text, id, user, tether }) => {
    const body = { answer, text, id, user, tether };
    const response = await axiosInstance.post(`payments/withdrawsAnswer/`, body);
    return response.data;
});

export const clientWithdrawsList = createAsyncThunk("user/clientWithdrawsList", async () => {
    const response = await axiosInstance.get(`payments/clientWithdrawsList/`);
    return response.data;
});

export const changeCurrnecy = createAsyncThunk("user/changeCurrnecy", async ({ user, currency, amount }) => {
    const body = { user, currency, amount };
    const response = await axiosInstance.post(`admin/changeCurrnecy/`, body);
    return response.data;
});

export const BuyUSDTClient = createAsyncThunk("user/BuyUSDTClient", async ({ user, tether, tokenRecive, tokenPrice }) => {
    const body = { user, tether, tokenRecive, tokenPrice };
    const response = await axiosInstance.post(`payments/buy/`, body);
    return response.data;
});

export const SellUSDTClient = createAsyncThunk("user/SellUSDTClient", async ({ user, tetherRecive, token, tokenPrice }) => {
    const body = { user, tetherRecive, token, tokenPrice };
    const response = await axiosInstance.post(`payments/sell/`, body);
    return response.data;
});

export const GetSellAndBuyClient = createAsyncThunk("user/GetSellAndBuyClient", async ({ id }) => {
    const body = { id };
    const response = await axiosInstance.post(`payments/infoClient/`, body);
    return response.data;
});

export const GetSellAndBuyPublic = createAsyncThunk("user/GetSellAndBuyPublic", async () => {
    const response = await axiosInstance.get(`payments/infoPublic/`);
    return response.data;
});

export const GetSellAndBuyAdmin = createAsyncThunk("user/GetSellAndBuyAdmin", async () => {
    const response = await axiosInstance.get(`payments/infoAdmin/`);
    return response.data;
});

export const ChangeVolume = createAsyncThunk("user/ChangeVolume", async ({ volume }) => {
    const body = { volume };
    const response = await axiosInstance.post(`chart/volume/`, body);
    return response.data;
});

export const ChangePassword = createAsyncThunk("user/ChangePassword", async ({ email }) => {
    const body = { email };
    const response = await axiosInstance.post(`admin/ChangePasswordRequest/`, body);
    return response.data;
});

export const ChangePasswordConfirmation = createAsyncThunk("user/ChangePasswordConfirmation", async ({ code, password }) => {
    const body = { code, password };
    const response = await axiosInstance.post(`admin/PasswordConfirmation/`, body);
    return response.data;
});


export const GetChartDetail = createAsyncThunk("user/GetChartDetail", async () => {
    const response = await axiosInstance.get(`chart/detail/`);
    return response.data;
});


export const AcceptDeposit = createAsyncThunk("user/AcceptDeposit", async ({ pk }) => {
    const body = { pk }
    const response = await axiosInstance.post(`payments/accept/`, body);
    return response.data;
});

export const DisableDeposit = createAsyncThunk("user/DisableDeposit", async ({ pk }) => {
    const body = { pk }
    const response = await axiosInstance.post(`payments/disable/`, body);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState: { depostiRequest: null, price: null, SellAndBuyAdmin: null, SellAndBuyPublic: null, SellAndBuyClient: null, clientWithdrawsList: null, withdrawsList: null, allDepoits: null, userDetail: null, temporaryChartData: null, paymentsClient: null, chartData: null, transaction: false, isAuthenticated: false, loading: false, error: "", depositCreate: null, user: null, tickets: null, members: null },
    reducers: {
        activateAuth(state) {
            state.isAuthenticated = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('access', action.payload.access);
                localStorage.setItem('refresh', action.payload.refresh);
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                localStorage.setItem('auth', action.payload.user_type);

            })
            .addCase(getUser.rejected, state => {
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(allTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(allTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(allTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminUserList.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(AdminUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminTicketList.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminTicketList.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(AdminTicketList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminTicketAnswer.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminTicketAnswer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AdminTicketAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ClientTicketAnswer.pending, (state) => {
                state.loading = true;
            })
            .addCase(ClientTicketAnswer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(ClientTicketAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminTicketComplete.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminTicketComplete.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AdminTicketComplete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminUserSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminUserSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(AdminUserSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ChartData.pending, (state) => {
                state.loading = true;
            })
            .addCase(ChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.chartData = action.payload;
            })
            .addCase(ChartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DepositCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(DepositCreate.fulfilled, (state, action) => {
                state.depositCreate = action.payload
                state.loading = false;
            })
            .addCase(DepositCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DepositCheck.pending, (state) => {
                state.loading = true;
            })
            .addCase(DepositCheck.fulfilled, (state, action) => {
                state.transaction = true
                state.loading = false;
            })
            .addCase(DepositCheck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DepositHistoryClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(DepositHistoryClient.fulfilled, (state, action) => {
                state.paymentsClient = action.payload
                state.loading = false;
            })
            .addCase(DepositHistoryClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(temporaryChartData.pending, (state) => {
                state.loading = true;
            })
            .addCase(temporaryChartData.fulfilled, (state, action) => {
                state.temporaryChartData = action.payload
                state.loading = false;
            })
            .addCase(temporaryChartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddPriceData.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddPriceData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AddPriceData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(UserFullDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserFullDetails.fulfilled, (state, action) => {
                state.userDetail = action.payload
                state.loading = false;
            })
            .addCase(UserFullDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(changeStatusUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeStatusUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(changeStatusUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(allDepositUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(allDepositUsers.fulfilled, (state, action) => {
                state.allDepoits = action.payload
                state.loading = false;
            })
            .addCase(allDepositUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(withdrawEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(withdrawEmail.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(withdrawEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AdminWithdraws.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminWithdraws.fulfilled, (state, action) => {
                state.withdrawsList = action.payload
                state.loading = false;
            })
            .addCase(AdminWithdraws.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(changeWithdrawAnswer.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeWithdrawAnswer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(changeWithdrawAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(clientWithdrawsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(clientWithdrawsList.fulfilled, (state, action) => {
                state.clientWithdrawsList = action.payload
                state.loading = false;
            })
            .addCase(clientWithdrawsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(changeCurrnecy.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeCurrnecy.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(changeCurrnecy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(BuyUSDTClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(BuyUSDTClient.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(BuyUSDTClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(SellUSDTClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(SellUSDTClient.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(SellUSDTClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetSellAndBuyClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellAndBuyClient.fulfilled, (state, action) => {
                state.SellAndBuyClient = action.payload
                state.loading = false;
            })
            .addCase(GetSellAndBuyClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetSellAndBuyPublic.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellAndBuyPublic.fulfilled, (state, action) => {
                state.SellAndBuyPublic = action.payload
                state.loading = false;
            })
            .addCase(GetSellAndBuyPublic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetSellAndBuyAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellAndBuyAdmin.fulfilled, (state, action) => {
                state.SellAndBuyAdmin = action.payload
                state.loading = false;
            })
            .addCase(GetSellAndBuyAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ChangeVolume.pending, (state) => {
                state.loading = true;
            })
            .addCase(ChangeVolume.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(ChangeVolume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ChangePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(ChangePassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ChangePasswordConfirmation.pending, (state) => {
                state.loading = true;
            })
            .addCase(ChangePasswordConfirmation.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(ChangePasswordConfirmation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(EmailCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(EmailCode.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(EmailCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetChartDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetChartDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.price = action.payload
            })
            .addCase(GetChartDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DepositRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(DepositRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.depostiRequest = action.payload
            })
            .addCase(DepositRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AcceptDeposit.pending, (state) => {
                state.loading = true;
            })
            .addCase(AcceptDeposit.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AcceptDeposit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DisableDeposit.pending, (state) => {
                state.loading = true;
            })
            .addCase(DisableDeposit.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(DisableDeposit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { activateAuth } = userSlice.actions
export default userSlice.reducer;




