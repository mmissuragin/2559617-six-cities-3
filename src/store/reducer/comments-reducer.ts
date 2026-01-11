import { OffersState } from './initial-state';
import { fetchCommentsByOfferId } from '../api-actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const commentsReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(fetchCommentsByOfferId.pending, (state) => {
      state.isCommentsLoading = true;
      state.currentComments = [];
    })
    .addCase(fetchCommentsByOfferId.fulfilled, (state, action) => {
      state.currentComments = action.payload;
      state.isCommentsLoading = false;
    })
    .addCase(fetchCommentsByOfferId.rejected, (state) => {
      state.isCommentsLoading = false;
      state.currentComments = [];
    });
};
