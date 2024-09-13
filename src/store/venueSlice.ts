import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {IItem, ISection, IWebSettings} from "../shared/interfaces/MenuBody";
import {IOrderItem} from "../shared/interfaces/Food";

interface InitialState {
    loading: boolean;
    error: string | null;
    settings: IWebSettings | null;
    currency: string | null;
    sections: ISection[] | null;
    sectionName: string | null;
    sectionSelected: IItem[] | null;
    orderItems: Array<IOrderItem>
}

const initialState: InitialState = {
    loading: false,
    error: null,
    settings: null,
    currency: null,
    sections: null,
    sectionName: null,
    sectionSelected: null,
    orderItems: []
};

const fetchVenue = createAsyncThunk('fetchVenue', async () => {
    const url = '/challenge/venue/9'
    const response = await axios.get(url);
    return response.data;
});

const fetchMenu = createAsyncThunk('fetchMenu', async () => {
    const url = '/challenge/menu'
    const response = await axios.get(url);
    return response.data;
});

const venueSlice = createSlice({
    name: 'getVenue',
    initialState,
    reducers: {
        changeSection: (state, action: PayloadAction<number>) => {
            if (state.sections) {
                const selected = state.sections.find((section: ISection) => (
                    section.id === action.payload))

                state.sectionName = selected?.name ? selected.name : null;
                state.sectionSelected = selected?.items ? selected.items : null;
            }
        },
        addOrderBasket:  (state, action: PayloadAction<IOrderItem>) => {
            state.orderItems = [...state.orderItems, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVenue.fulfilled, (state, action) => {
                state.loading = false;
                state.currency = action.payload.currency;
                state.settings = action.payload.webSettings;

            })
            .addCase(fetchVenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch venue';
            });
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.sections = action.payload.sections;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch menu';
            });
    },
});

export { fetchVenue, fetchMenu };
export const {changeSection, addOrderBasket } = venueSlice.actions
export default venueSlice.reducer;