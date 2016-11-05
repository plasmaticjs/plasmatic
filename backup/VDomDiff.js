import type { HtmlNodeType } from './Types';

type PatchObjectType = {
  type: string,
  source: HtmlNodeType,
  target: HtmlNodeType
};

class VDomDiff {
  patchObject: Array<PatchObjectType>;
  constructor(t1: HtmlNodeType, t2: HtmlNodeType) {
    this.patchObject = [];
    this.patch(t1, t2);
  }

  patch(t1: HtmlNodeType, t2: HtmlNodeType): VDomDiff {
    this.traverse(t1, t2, 0);

    return this;
  }

  applyPatch() {
    this.patchObject.map((patch: PatchObjectType): PatchObjectType => {
      const newPatch = patch;
      if (patch.type === 'CONTENT') {
        newPatch.target.textContent = patch.source.textContent;
      }

      return newPatch;
    });
  }

  traverse(t1: HtmlNodeType, t2: HtmlNodeType, idx: number) {
    if (t1 === t2) {
      return;
    }


    this.diffNodes(t1, t2, idx);
  }

  diffNodes(t1: HtmlNodeType, t2: HtmlNodeType, idx: number) {
    if ((!t1.children || t1.children.length === 0) || (!t2.children || t2.children.length === 0)) {
      if (t1.textContent !== t2.textContent) {
        this.patchObject.push({
          type: 'CONTENT',
          source: t1,
          target: t2,
        });
      }
    } else {
      const t1Childrens = t1.children;
      const t2Childrens = t2.children;

      for (let i = 0; i < t1Childrens.length; i += 1) {
        const left = t1Childrens[i];
        const right = t2Childrens[i];

        this.traverse(left, right, idx + 1);
      }
    }
  }
}

export default VDomDiff;
