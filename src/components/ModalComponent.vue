<template>
<div class="modal fade show" id="myModal" style="display: block;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><slot name="modal-header"></slot></h4>
                <button type="button" class="close" @click="$emit('close')" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" >×</span>
                </button>
            </div>
            <div class="modal-body">
                <slot name="modal-text"></slot>
            </div>
            <div class="modal-footer">
                <slot name="modal-footer"></slot>
                <button type="button" class="btn btn-danger" @click="$emit('close')" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "ModalComponent"
    }
</script>
