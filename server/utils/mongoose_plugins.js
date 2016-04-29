/**
 * Created by alex on 28/04/16.
 */
module.exports.timestamps = function(schema) {
    schema.add({
        deletedAt: Date
    });
};

module.exports.eventsCreateUpdate = function(schema) {
    schema.pre('save', function (next) {
        this._wasnew = this.isNew;
        next();
    });
    schema.post('save', function () {
        if (this._wasnew) this.emit('create', this);
        else this.emit('update', this);
    });
};
