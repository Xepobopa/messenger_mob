import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const MessageContainer = styled(View)<{ $type: 'my' | 'other' }>`
  align-self: ${(props) => (props.$type === 'my' ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  min-width: 20%; /* Устанавливаем минимальную ширину контейнера */
  padding: 10px;
  margin: 5px 0;
  border-radius: 15px;
  background-color: ${(props) =>
    props.$type === 'my' ? '#2b5278' : '#182533'}; /* Цвета фонов сообщений */
  border-bottom-right-radius: ${(props) =>
    props.$type === 'my' ? '0' : '15px'};
  border-bottom-left-radius: ${(props) =>
    props.$type === 'my' ? '15px' : '0'};
  position: relative; /* Для позиционирования времени */
`;
// Новый компонент для треугольника
export const Triangle = styled(View)<{ $type: 'my' | 'other' }>`
  position: absolute;
  bottom: 0; /* Положение чуть ниже нижнего края */
  ${(props) => (props.$type === 'my' ? 'right: 5px;' : 'left: 5px;')}; 
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px;
  border-color: transparent;
  ${(props) =>
    props.$type === 'my'
      ? `
    border-bottom-color: #2b5278; 
    border-left-width: 0; 
    border-right-width: 8px; 
    `
      : `
    border-bottom-color: #182533; /* Цвет треугольника для полученных сообщений */
    border-right-width: 0; /* Убираем правую границу */
    border-left-width: 8px; /* Устанавливаем левую границу */
    `};
`;

export const MessageInfo = styled(Text)<{ $type: 'my' | 'other' }>`
  font-size: 12px; /* Размер шрифта */
  position: absolute; /* Абсолютное позиционирование */
  bottom: 5px; /* Отступ снизу */
  right: 10px; /* Отступ справа */
  color: ${(props) => (props.$type === 'my' ? '#7da8d3' : '#6b7d8c')}; /* Цвет времени */
`;
// Оставляем MessageText как есть
export const MessageText = styled(Text)`
  font-size: 16px;
  color: #e1e1e1; /* Светлый цвет текста */
  margin-bottom: 15px; /* Добавляем отступ снизу для времени */
`;