import { Subject } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createSubject = async (payload: Subject): Promise<Subject | null> => {
  const createdSubject = await prisma.subject.create({
    data: payload,
  });
  return createdSubject;
};

const getAllSubjects = async (): Promise<Subject[] | null> => {
  const subjects = await prisma.subject.findMany();
  return subjects;
};

const getSingleSubject = async (id: string): Promise<Subject | null> => {
  const result = await prisma.subject.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return result;
};

const updateSubject = async (
  id: string,
  payload: Partial<Subject>
): Promise<Subject | null> => {
  const isExist = await prisma.subject.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found !');
  }

  const result = await prisma.subject.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSubject = async (id: string): Promise<Subject | null> => {
  const isExist = await prisma.subject.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  const result = await prisma.subject.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SubjectService = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
