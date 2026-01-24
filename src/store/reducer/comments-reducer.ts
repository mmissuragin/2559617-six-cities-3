import { OffersState } from './initial-state';
import { fetchCommentsByOfferId, postCommentByOfferId } from '../api-actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const commentsReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(fetchCommentsByOfferId.pending, (state) => {
      state.isCommentsLoading = true;
      state.currentComments = [];
    })
    .addCase(fetchCommentsByOfferId.fulfilled, (state, action) => {
      state.currentComments = [...action.payload].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      state.isCommentsLoading = false;
    })
    .addCase(fetchCommentsByOfferId.rejected, (state) => {
      state.isCommentsLoading = false;
      state.currentComments = [];
    })

    .addCase(postCommentByOfferId.pending, (state) => {
      state.isCommentsLoading = true;
    })
    .addCase(postCommentByOfferId.fulfilled, (state) => {
      state.isCommentsLoading = false;
    })
    .addCase(postCommentByOfferId.rejected, (state) => {
      state.isCommentsLoading = false;
    });
};
