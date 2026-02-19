import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  as?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as = 'span',
  className = '',
  style,
}) => {
  const { isEditMode } = useEditMode();
  const Tag = as as any;

  if (!isEditMode) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-dashed outline-1 outline-primary/30 -outline-offset-2 hover:outline-primary/60 focus:outline-primary focus:outline-2 focus:outline-solid cursor-text rounded-sm transition-all`}
      style={style}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const newVal = e.currentTarget.textContent || '';
        if (newVal !== value) onChange(newVal);
      }}
    >
      {value}
    </Tag>
  );
};
