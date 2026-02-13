import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { OffersState } from './initial-state';
import { fetchCommentsByOfferId, postCommentByOfferId} from '../api-actions';

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
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      state.isCommentsLoading = false;
    })

    .addCase(postCommentByOfferId.fulfilled, (state, action) => {
      state.currentComments = [
        action.payload,
        ...state.currentComments,
      ];
    })

    .addCase(fetchCommentsByOfferId.rejected, (state) => {
      state.isCommentsLoading = false;
    });
};
