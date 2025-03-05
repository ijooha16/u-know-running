import { create } from "zustand";

const useCommentStore = create((set) => ({
  commentArr: [], // 댓글 배열

  // 전체 댓글을 업데이트 (배열 통째로 바꿀 때 사용)
  setComments: (comments) => set({ commentArr: comments }),

  // 새로운 댓글 추가
  createStoreComment: (comment) => set((state) => ({ commentArr: [...state.commentArr, comment] })),

  // 댓글 삭제
  removeComment: (id) =>
    set((state) => ({
      commentArr: state.commentArr.filter((comment) => comment.id !== id) // `comment.id !== commentId`로 비교
    })),

  //댓글 수정
  updateStoreComment: ({ id, newText }) =>
    set((state) => ({
      commentArr: state.commentArr.map((comment) => (comment.id === id ? { ...comment, comments: newText } : comment))
    }))
}));

export default useCommentStore;
