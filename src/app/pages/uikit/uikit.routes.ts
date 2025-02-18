import { Routes } from '@angular/router';
import { ButtonBase } from './buttonbase';
import { ChartBase } from './chartbase';
import { FileBase } from './filebase';
import { FormLayoutBase } from './formlayoutbase';
import { InputBase } from './inputbase';
import { ListBase } from './listbase';
import { MediaBase } from './mediabase';
import { MessagesBase } from './messagesbase';
import { MiscBase } from './miscbase';
import { PanelsBase } from './panelsbase';
import { TimelineBase } from './timelinebase';
import { TableBase } from './tablebase';
import { OverlayBase } from './overlaybase';
import { TreeBase } from './treebase';
import { MenuBase } from './menubase';

export default [
  { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonBase },
  { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartBase },
  { path: 'file', data: { breadcrumb: 'File' }, component: FileBase },
  {
    path: 'formlayout',
    data: { breadcrumb: 'Form Layout' },
    component: FormLayoutBase,
  },
  { path: 'input', data: { breadcrumb: 'Input' }, component: InputBase },
  { path: 'list', data: { breadcrumb: 'List' }, component: ListBase },
  { path: 'media', data: { breadcrumb: 'Media' }, component: MediaBase },
  { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesBase },
  { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscBase },
  { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsBase },
  {
    path: 'timeline',
    data: { breadcrumb: 'Timeline' },
    component: TimelineBase,
  },
  { path: 'table', data: { breadcrumb: 'Table' }, component: TableBase },
  { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayBase },
  { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeBase },
  { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuBase },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
