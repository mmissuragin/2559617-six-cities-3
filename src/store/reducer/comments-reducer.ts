import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { OffersState } from './initial-state';
import {
  fetchCommentsByOfferId
} from '../api-actions';

export const commentsReducer = (
  builder: ActionReducerMapBuilder<OffersState>
) => {
  builder
    .addCase(fetchCommentsByOfferId.pending, (state) => {
      state.isCommentsLoading = true;
    })

    .addCase(fetchCommentsByOfferId.fulfilled, (state, action) => {
      state.currentComments =
      [...action.payload]
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, 10);
      state.isCommentsLoading = false;
    })

    .addCase(fetchCommentsByOfferId.rejected, (state) => {
      state.isCommentsLoading = false;
    });
};
